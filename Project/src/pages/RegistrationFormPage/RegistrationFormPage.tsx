import styles from "./RegistrationFormPage.module.scss";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/Button/Button";
import { userRegister } from "../../api/api";
import { UserAuth } from "../../api/apiTypes";

import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hooksType";
import { changeIsError, setErrorText } from "../../redux/ErrorSlice";
import { changeAgreed, setAgreedNavigate, setAgreedText } from "../../redux/AgreedSlice";
import { Loader } from "../../components/Loader/Loader";

interface UseFormType {
  emailReg: string;
  passwordReg: string;
  repeatPass: string;
}

const RegistrationFormPage = () => {
  const [textError, setTextError] = useState<string | null>(null);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<UseFormType>();

  const { mutate } = useMutation({
    mutationFn: (data: UserAuth) => userRegister(data),
    onSuccess: () => {
      dispatch(setAgreedText("Регистрация прошла успешно!"));
      dispatch(setAgreedNavigate("/api/login"));
      dispatch(changeAgreed(true));
    },
    onError: (error) => {
      if (error.message.includes("email") && error.message.includes("already")) {
        setTextError("Аккаунт с данным email уже существует");npm run
      } else {
        dispatch(setErrorText(error.message));
        dispatch(changeIsError(true));
      }
    },
  });

  const onSubmit: SubmitHandler<UseFormType> = (data) => {
    const regForm = {
      email: data.emailReg,
      password: data.passwordReg,
    };
    mutate(regForm);
  };

  return (
    <section className={styles.registration}>
      <div className={styles["registration__wrapper"]}>
        <h2 className={styles["registration__title"]}>Регистрация</h2>

        {textError && <span className={styles["registration__error"]}>{textError}</span>}

        <form className={styles["registration__form"]} onSubmit={handleSubmit(onSubmit)}>
          <fieldset className={styles["registration__form-fieldset"]}>
            <CustomInput
              labelText="Email"
              labelFor="emailReg"
              type="email"
              inputAutocomplete="email"
              placeholder="Email"
              errorMsg={errors.emailReg?.message}
              {...register("emailReg", {
                required: "Укажите email",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Введите корректный email адрес",
                },
              })}
              onChange={(e) => {
                if (textError !== null) {
                  setTextError(null);
                }
                register("emailReg").onChange(e);
              }}
            />

            <div className={styles["registration__form-group"]}>
              <CustomInput
                labelText="Пароль"
                labelFor="passwordReg"
                type="password"
                inputAutocomplete="new-password"
                placeholder="Пароль"
                errorMsg={errors.passwordReg?.message}
                {...register("passwordReg", {
                  required: "Поле обазательно",
                  minLength: { value: 6, message: "Минимум 6 символов" },
                  validate: (value) => {
                    const passwordValue = getValues("repeatPass");
                    return value === passwordValue || "Пароли не совпадают";
                  },
                })}
              />
              <CustomInput
                labelText="Повторите пароль"
                labelFor="repeatPass"
                type="password"
                inputAutocomplete="off"
                placeholder="Повторите пароль"
                errorMsg={errors.repeatPass?.message}
                {...register("repeatPass", {
                  required: "Поле обазательно",
                  minLength: { value: 6, message: "Минимум 6 символов" },
                })}
              />
            </div>
          </fieldset>
          <div className={styles["registration__form-buttons"]}>
            <Button
              whichClass="btn--submit"
              type="submit"
              ariaLabel="Кнопка зарегистрироваться"
              disabled={isSubmitting}
            >
              Зарегистрироваться
            </Button>

            <Button
              whichClass="btn--toggle"
              type="button"
              ariaLabel="Кнопка перейти на страницу авторизации"
              onClick={() => navigate("/api/login")}
            >
              Есть пароль
            </Button>
          </div>
        </form>
      </div>
      {isSubmitting && <Loader />}
    </section>
  );
};

export default RegistrationFormPage;
