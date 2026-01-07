import styles from "./FeedbackForm.module.scss";
import Button from "../../Button/Button";
import CustomInput from "../../CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import CostomTextarea from "../../CostomTextarea/CostomTextarea";
import Icon from "../../Icon/Icon";

export const FeedbackForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <section className={styles.feedback}>
      <div className={styles["feedback__wrapper"]}>
        <h2 className={styles["feedback__title"]}>Добавление отзыва</h2>
        <form className={styles.feedback__form} onSubmit={handleSubmit(onSubmit)}>
          <span className={styles["feedback__form-error"]}>{}</span>
          <fieldset className={styles["feedback__form-fieldset"]}>
            <CustomInput
              labelText="Ваше имя"
              labelFor="fullName"
              type="email"
              placeholder="Ваше имя"
              {...register("fullName", {
                required: "Напишите имя ",
                // pattern: {
                //   value: /^\S+@\S+\.\S+$/,
                //   message: "Введите корректный email адрес",
                // },
              })}
            />
            {/* {errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>} */}
            <CostomTextarea
              labelText="Отзыв"
              labelFor="comment"
              placeholder="Добавьте текст отзыва"
              {...register("comment", {
                required: "Добавьте текст отзыва",
                maxLength: {
                  value: 2000,
                  message: "Максимум 2000 символов",
                },
              })}
            />
          </fieldset>

          <div className={styles["feedback__form-buttons"]}>
            <Button
              whichClass="btn--toggle"
              type="button"
              ariaLabel="Кнопка перейти на форму регистрации"
              // onClick={handelOnClick}
            >

              <Icon classN="icon--arrow-left" hrefName="arrow-left" />
              <span> Назад</span>
            </Button>

            <Button
              whichClass="btn--submit"
              type="submit"
              ariaLabel="Кнопка войти"
              // disabled={isSubmitting}
            >
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
