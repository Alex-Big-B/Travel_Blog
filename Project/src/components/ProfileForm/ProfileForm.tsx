import styles from "./ProfileForm.module.scss";
import Button from "../Button/Button";
import CostomTextarea from "../CostomTextarea/CostomTextarea";
import CustomInput from "../CustomInput/CustomInput";
import { ChangeUserPasswordRequest } from "../../api/apiTypes";
import { changeUserData, changeUserDataRequest, changeUserPassword } from "../../api/api";

import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hooksType";
import { changeIsError, setErrorText } from "../../redux/ErrorSlice";
import { changeAgreed,  setAgreedText } from "../../redux/AgreedSlice";

type ProfileFormProps = { onSave: () => void };

interface UseFormType {
  changeFullName: string;
  changeCity: string;
  changeCountry: string;
  changeBio: string;
  newPassword: string;
  chekNewPassword: string;
}

const ProfileForm = ({ onSave }: ProfileFormProps) => {
  const userData = useAppSelector((state) => state.userData);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<UseFormType>({
    defaultValues: {
      changeFullName: userData.full_name,
      changeCity: userData.city,
      changeCountry: userData.country,
      changeBio: userData.bio,
    },
  });

  const handleSuccess = () => {
    dispatch(setAgreedText("Данные успешно изменены!"));
    dispatch(changeAgreed(true));
    onSave();
  };

  // Мутируем данные пользователя
  const { mutate: mutateUerDate } = useMutation({
    mutationFn: ({ full_name, city, country, bio }: changeUserDataRequest) =>
      changeUserData({ full_name, city, country, bio }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      handleSuccess();
    },
    onError: (error) => {
      dispatch(setErrorText(error.message));
      dispatch(changeIsError(true));
    },
  });

  // Мутируем пароль пользователя
  const { mutate: mutateUerPassword } = useMutation({
    mutationFn: ({ password }: ChangeUserPasswordRequest) => changeUserPassword({ password }),
    onSuccess: handleSuccess,
    onError: (error) => {
      dispatch(setErrorText(error.message));
      dispatch(changeIsError(true));
    },
  });

  const onFormSubmit: SubmitHandler<UseFormType> = (data) => {
    if (data.newPassword && data.chekNewPassword) {
      const userPassword = {
        password: data.newPassword,
      };

      mutateUerPassword(userPassword);
    }

    if (data.changeFullName || data.changeCity || data.changeCountry || data.changeBio) {
      const userDate = {
        full_name: data.changeFullName,
        city: data.changeCity,
        country: data.changeCountry,
        bio: data.changeBio,
      };
      mutateUerDate(userDate);
    }
  };

  return (
    <form className={styles["profile-form"]} onSubmit={handleSubmit(onFormSubmit)}>
      <fieldset className={styles["profile-form__information"]}>
        <CustomInput
          labelText="ФИО"
          labelFor="changeFullName"
          type="text"
          inputAutocomplete="name"
          notFlake={true}
          errorMsg={errors.changeFullName?.message}
          {...register("changeFullName", {
            maxLength: { value: 50, message: "Максимум 50 символов" },
          })}
        />

        <div className={styles["profile-form__group"]}>
          <CustomInput
            labelText="Город"
            labelFor="changeCity"
            type="text"
            inputAutocomplete="city"
            notFlake={true}
            errorMsg={errors.changeCity?.message}
            {...register("changeCity", {
              maxLength: { value: 30, message: "Максимум 30 символов" },
            })}
          />
          <CustomInput
            labelText="Страна"
            labelFor="changeCountry"
            type="text"
            inputAutocomplete="country"
            notFlake={true}
            errorMsg={errors.changeCountry?.message}
            {...register("changeCountry", {
              maxLength: { value: 30, message: "Максимум 30 символов" },
            })}
          />
        </div>
        <CostomTextarea
          labelText="О себе"
          labelFor="changeBio"
          length="0 / 600"
          notFlake={true}
          errorMsg={errors.changeBio?.message}
          {...register("changeBio", {
            maxLength: {
              value: 600,
              message: "Максимум 600 символов",
            },
          })}
        />
      </fieldset>
      <fieldset className={styles["profile-form__password"]}>
        <legend className={styles["profile-form__password-legend"]}>Смена пароля</legend>
        <div className={styles["profile-form__group"]}>
          <CustomInput
            labelText="Новый пароль"
            labelFor="newPassword"
            type="password"
            placeholder="Новый пароль"
            errorMsg={errors.newPassword?.message}
            {...register("newPassword", {
              minLength: { value: 6, message: "Минимум 6 символов" },
              maxLength: { value: 30, message: "Максимум 30 символов" },
              validate: (value) => {
                const testPass = getValues("chekNewPassword");
                return value === testPass || "Пароли не совпадают";
              },
            })}
          />

          <CustomInput
            labelText="Повторите пароль"
            labelFor="chekNewPassword"
            type="password"
            placeholder="Повторите пароль"
            errorMsg={errors.chekNewPassword?.message}
            {...register("chekNewPassword")}
          />
        </div>
      </fieldset>
      <div className={styles["profile-form__buttons"]}>
        <Button
          whichClass="btn--toggle"
          type="button"
          ariaLabel="Кнопка вернуться назад"
          onClick={onSave}
        >
          Назад
        </Button>

        <Button
          whichClass="btn--submit"
          type="submit"
          ariaLabel="Кнопка Сохранить данные"
          disabled={isSubmitting}
        >
          Сохранить
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
