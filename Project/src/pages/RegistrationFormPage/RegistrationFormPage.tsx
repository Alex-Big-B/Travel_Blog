import styles from "./RegistrationFormPage.module.scss";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/Button/Button";
import { userRegister } from "../../api/api";
import { UserAuth } from "../../api/apiTypes";

import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { SuccessModal } from "../../components/modalWindows/SuccessModal/SuccessModal";
import { useState } from "react";

interface UseFormType {
  emailReg: string;
  passwordReg: string;
  repeatPass: string;
}

const RegistrationFormPage = () => {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<UseFormType>();

  const { mutate } = useMutation({
    mutationFn: (data: UserAuth) => userRegister(data),
    onSuccess: () => {
      setAgreed(true);
    },
    onError: (error) => {
      alert(error.message);
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

      {agreed && (
        <SuccessModal
          successText="Регистрация прошла успешно!"
          onClose={() => {
            setAgreed(false);
            navigate("/api/login");
          }}
        />
      )}
    </section>
  );
};

export default RegistrationFormPage;
