import styles from "./PostFormPage.module.scss";

import Icon from "../../components/Icon/Icon";
import CustomInput from "../../components/CustomInput/CustomInput";
import CostomTextarea from "../../components/CostomTextarea/CostomTextarea";
import CustomFileInput from "../../components/CustomFileInput/CustomFileInput";
import Button from "../../components/Button/Button";

import { addPost } from "../../api/api";
import { AddPostRequest } from "../../api/apiTypes";

import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooksType";
import { changeIsError, setErrorText } from "../../redux/ErrorSlice";
import { changeAgreed, setAgreedNavigate, setAgreedText } from "../../redux/AgreedSlice";

interface UseFormType {
  photo: File | null;
  title: string;
  country: string;
  city: string;
  story: string;
}

const checkImgType = (file: File | null) => {
  if (!file) return true;

  const allowedExtensions = /\.(jpg|jpeg|png)$/i;

  if (!allowedExtensions.test(file.name)) {
    return "Разрешены только файлы с расширениями .jpg, .jpeg, .png";
  }
  if (file.size > 5 * 1024 * 1024) {
    return "Файл слишком большой (максимум 5 MB)";
  }

  return true;
};

export const PostFormPage = () => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UseFormType>({
    defaultValues: {
      photo: null,
    },
  });

  const { mutate } = useMutation({
    mutationFn: ({ title, description, country, city, photo }: AddPostRequest) =>
      addPost({ title, description, country, city, photo }),
    onSuccess: () => {
      dispatch(setAgreedText("Ваш отзыв успешно добавлен."));
      dispatch(setAgreedNavigate("/"));
      dispatch(changeAgreed(true));
    },
    onError: (error) => {
      console.log(error.message);
      dispatch(setErrorText(error.message));
      dispatch(changeIsError(true));
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (fileList && fileList.length > 0) {
      const file = fileList[0];

      const validationResult = checkImgType(file);
      setValue("photo", file, { shouldValidate: true });

      if (validationResult == true) {
        const url = URL.createObjectURL(file);
        setImgUrl(url);
      }
    } else {
      setValue("photo", null, { shouldValidate: true });
      setImgUrl(null);
    }
  };

  useEffect(() => {
    const url = imgUrl;
    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [imgUrl]);

  const onSubmit: SubmitHandler<UseFormType> = async (data) => {
    if (data.title && data.photo && data.story && data.country && data.city) {
      const newPostData = {
        title: data.title,
        description: data.story,
        country: data.country,
        city: data.city,
        photo: data.photo,
      };

      mutate(newPostData);
    }
  };

  return (
    <section className={styles.post}>
      <div className={styles["post__wrapper"]}>
        <h2 className={styles["post__title"]}>Добавление истории о путешествии</h2>
        <form
          className={styles.post__form}
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <fieldset className={styles["post__form-fieldset"]}>
            <CustomFileInput
              labelText="Загрузите ваше фото"
              labelFor="photo"
              type="file"
              errorMsg={errors.photo?.message}
              accept=".jpg, .jpeg, .png"
              iconClass="icon--upload"
              iconHref="upload"
              {...register("photo", {
                validate: {
                  required: (file) => file !== null || "Добавьте фото",
                  checkExtension: checkImgType,
                },
                onChange: handleFileChange,
              })}
            />

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
              errorMsg={errors.title?.message}
              {...register("title", {
                required: "Напишите заголовок",
                minLength: {
                  value: 5,
                  message: "Минимум 5 символов",
                },
                maxLength: {
                  value: 40,
                  message: "Максимум 40 символов",
                },
              })}
            />

            <div className={styles["post__form-group"]}>
              <CustomInput
                labelText="Страна"
                labelFor="country"
                type="text"
                inputAutocomplete="country"
                placeholder="Страна"
                errorMsg={errors.country?.message}
                {...register("country", {
                  required: "Напишите название страны",
                  minLength: {
                    value: 3,
                    message: "Минимум 3 символа",
                  },
                  maxLength: {
                    value: 40,
                    message: "Максимум 40 символов",
                  },
                })}
              />

              <CustomInput
                labelText="Город"
                labelFor="city"
                type="text"
                inputAutocomplete="address-level2"
                placeholder="Город"
                errorMsg={errors.city?.message}
                {...register("city", {
                  required: "Напишите название города",
                  minLength: {
                    value: 3,
                    message: "Минимум 3 символа",
                  },
                  maxLength: {
                    value: 30,
                    message: "Максимум 30 символов",
                  },
                })}
              />
            </div>

            <CostomTextarea
              labelText="Описание"
              labelFor="story"
              placeholder="Добавьте описание вашей истории "
              errorMsg={errors.story?.message}
              length="0 / 2 000"
              {...register("story", {
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
              ariaLabel="Кнопка перейти назад"
              onClick={() => navigate(-1)}
            >
              <Icon classN="icon--arrow-left" hrefName="arrow-left" />
              <span> Назад</span>
            </Button>

            <Button whichClass="btn--submit" type="submit" ariaLabel="Кнопка Сохранить">
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
