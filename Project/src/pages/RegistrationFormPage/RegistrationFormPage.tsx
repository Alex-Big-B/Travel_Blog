import styles from "./RegistrationFormPage.module.scss";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/Button/Button";
import { userRegister } from "../../api/api";
import { User } from "../../api/apiTypes";

import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface UseFormType {
  emailReg: string;
  passwordReg: string;
  repeatPass: string;
}

const RegistrationFormPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<UseFormType>();

  const { mutate } = useMutation({
    mutationFn: (data: User) => userRegister(data),
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
              placeholder="Email"
              {...register("emailReg", {
                required: true,
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Введите корректный email адрес",
                },
              })}
            />
            {errors.emailReg && (
              <span className={styles["registration__form-error"]}>{errors.emailReg.message}</span>
            )}

            <div className={styles["registration__form-group"]}>
              <CustomInput
                labelText="Пароль"
                labelFor="passwordReg"
                type="password"
                placeholder="Пароль"
                {...register("passwordReg", {
                  required: true,
                  minLength: { value: 6, message: "Минимум 6 символов" },
                })}
              />
              <CustomInput
                labelText="Повторите пароль"
                labelFor="repeatPass"
                type="password"
                placeholder="Повторите пароль"
                {...register("repeatPass", {
                  required: true,
                  minLength: { value: 6, message: "Минимум 6 символов" },
                  validate: (value) => {
                    const passwordValue = getValues("passwordReg");
                    return value === passwordValue || "Пароли не совпадают";
                  },
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
    </section>
  );
};

export default RegistrationFormPage;
