import styles from "./FeedbackFormPage.module.scss";
import Button from "../../components/Button/Button";
import CostomTextarea from "../../components/CostomTextarea/CostomTextarea";
import CustomInput from "../../components/CustomInput/CustomInput";
import Icon from "../../components/Icon/Icon";

import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addComment } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { AddCommentRequest } from "../../api/apiTypes";
import { queryClient } from "../../api/queryClient";
import { useAppDispatch } from "../../redux/hooksType";
import { changeIsError, setErrorText } from "../../redux/ErrorSlice";
import { changeAgreed, setAgreedNavigate, setAgreedText } from "../../redux/AgreedSlice";

interface UseFormType {
  fullName: string;
  comment: string;
}

const FeedbackFormPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UseFormType>();

  const { mutate } = useMutation({
    mutationFn: ({ id, full_name, comment }: AddCommentRequest) =>
      addComment({ id, full_name, comment }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", "one", postId] });
      dispatch(setAgreedText("Ваш отзыв успешно добавлен."));
      dispatch(setAgreedNavigate(`/api/posts/${postId}`));
      dispatch(changeAgreed(true));
    },
    onError: (error) => {
      console.log(error.message);
      dispatch(setErrorText(error.message));
      dispatch(changeIsError(true));
    },
  });

  const onSubmit: SubmitHandler<UseFormType> = (data) => {
    if (Number(postId) && data) {
      const apiDate = {
        id: Number(postId),
        full_name: data.fullName,
        comment: data.comment,
      };

      mutate(apiDate);
    }
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
              type="text"
              inputAutocomplete="name"
              placeholder="Ваше имя"
              errorMsg={errors.fullName?.message}
              {...register("fullName", {
                required: "Напишите имя ",
              })}
            />

            <CostomTextarea
              labelText="Отзыв"
              labelFor="comment"
              placeholder="Добавьте текст отзыва"
              errorMsg={errors.comment?.message}
              length="0 / 2 000"
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
              ariaLabel="Кнопка вернуться назад"
              onClick={() => navigate(-1)}
            >
              <Icon classN="icon--arrow-left" hrefName="arrow-left" />
              <span> Назад</span>
            </Button>

            <Button
              whichClass="btn--submit"
              type="submit"
              ariaLabel="Кнопка сохранить отзыв"
              disabled={isSubmitting}
            >
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FeedbackFormPage;
