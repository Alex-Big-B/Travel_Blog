import styles from "./PostForm.module.scss";
import Button from "../../Button/Button";
import CustomInput from "../../CustomInput/CustomInput";
import CostomTextarea from "../../CostomTextarea/CostomTextarea";
import Icon from "../../Icon/Icon";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export const PostForm = () => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImgUrl(url);
    } else {
      setImgUrl(null);
    }
  };

  useEffect(() => {
    return () => {
      if (imgUrl) {
        URL.revokeObjectURL(imgUrl);
      }
    };
  }, [imgUrl]);

  return (
    <section className={styles.post}>
      <div className={styles["post__wrapper"]}>
        <h2 className={styles["post__title"]}>Добавление отзыва</h2>
        <form
          className={styles.post__form}
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          {/* <span className={styles["post__form-error"]}>{}</span> */}
          <fieldset className={styles["post__form-fieldset"]}>
            <label
              className={styles["post__form-upload"]}
              htmlFor="foto"
              aria-label="Загрузить фото"
            >
              <input
                type="file"
                name="foto"
                id="foto"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
              <Icon classN="icon--upload" hrefName="upload" />
              <span>Загрузите ваше фото</span>
            </label>

            {imgUrl && (
              <img
                className={styles["post__form-preview"]}
                src={imgUrl}
                alt="Превью загруженного изображения"
              />
            )}

            <CustomInput
              labelText="Заголовок"
              labelFor="title"
              type="text"
              placeholder="Заголовок"
              {...register("title", {
                required: "Напишите заголовок",
                // pattern: {
                //   value: /^\S+@\S+\.\S+$/,
                //   message: "Введите корректный email адрес",
                // },
              })}
            />
            {/* {errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>} */}

            <div className={styles["post__form-group"]}>
              <CustomInput
                labelText="Страна"
                labelFor="country"
                type="text"
                placeholder="Страна"
                {...register("country", {
                  required: "Напишите название страны",
                  // pattern: {
                  //   value: /^\S+@\S+\.\S+$/,
                  //   message: "Введите корректный email адрес",
                  // },
                })}
              />
              <CustomInput
                labelText="Город"
                labelFor="city"
                type="text"
                placeholder="Город"
                {...register("city", {
                  required: "Напишите название города",
                  // pattern: {
                  //   value: /^\S+@\S+\.\S+$/,
                  //   message: "Введите корректный email адрес",
                  // },
                })}
              />
            </div>
            <CostomTextarea
              labelText="Город"
              labelFor="comment"
              placeholder="Город"
              {...register("comment", {
                required: "Напишите название города",
                maxLength: {
                  value: 2000,
                  message: "Максимум 2000 символов",
                },
              })}
            />
          </fieldset>

          <div className={styles["post__form-buttons"]}>
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
