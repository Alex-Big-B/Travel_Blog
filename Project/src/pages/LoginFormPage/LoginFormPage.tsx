import styles from "./LoginFormPage.module.scss";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/Button/Button";

import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { userLoging } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../api/apiTypes";
import { queryClient } from "../../api/queryClient";

interface UserForm {
  email: string;
  password: string;
}

const LoginFormPage = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UserForm>();

  const { mutate } = useMutation({
    mutationFn: ({ email, password }: UserAuth) => userLoging({ email, password }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      navigate("/");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const onSubmite: SubmitHandler<UserForm> = (data) => {
    console.log(data);
    mutate(data);
  };

  return (
    <section className={styles.login}>
      <div className={styles["login__wrapper"]}>
        <h2 className={styles["login__title"]}>Вход в профиль</h2>
        <form className={styles["login__form"]} onSubmit={handleSubmit(onSubmite)}>
          <span className={styles["login__form-error"]}>{}</span>
          <fieldset className={styles["login__form-fieldset"]}>
            <CustomInput
              labelText="Логин"
              labelFor="email"
              type="email"
              inputAutocomplete="username"
              placeholder="Email"
              errorMsg={errors.email?.message}
              {...register("email", {
                required: "Укажите логин",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Введите корректный email адрес",
                },
              })}
            />

            <CustomInput
              labelText="Пароль"
              labelFor="password"
              type="password"
              inputAutocomplete="current-password"
              placeholder="Пароль"
              errorMsg={errors.password?.message}
              {...register("password", {
                required: "Укажите пароль",
                minLength: { value: 6, message: "Минимум 6 символов" },
              })}
            />
          </fieldset>
          <div className={styles["login__form-buttons"]}>
            <Button
              whichClass="btn--toggle"
              type="button"
              ariaLabel="Кнопка перейти на форму регистрации"
              onClick={() => navigate("/api/register")}
            >
              Зарегистрироваться
            </Button>

            <Button
              whichClass="btn--submit"
              type="submit"
              ariaLabel="Кнопка войти"
              disabled={isSubmitting}
            >
              Войти
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginFormPage;
