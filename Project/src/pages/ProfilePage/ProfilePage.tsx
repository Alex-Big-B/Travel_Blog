import styles from "./ProfilePage.module.scss";
import Icon from "../../components/Icon/Icon";
import Button from "../../components/Button/Button";
import ProfileForm from "../../components/ProfileForm/ProfileForm";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooksType";
import { changeAgreed, setAgreedText } from "../../redux/AgreedSlice";

const ProfilePage = () => {
  const [isChange, setIsChange] = useState(false);

  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.userData);

  const handleOnFotoClik = () => {
    dispatch(setAgreedText("Сервер не предусмотрел наличие фотографии!"));

    dispatch(changeAgreed(true));
  };

  return (
    <section className={styles.profile}>
      <div className={styles["profile__photo"]}>
        <img
          className={styles["profile__photo-img"]}
          src="/avatar_img.jpg"
          alt="Изображение пользователя"
        />
        <button
          className={styles["profile__photo-btn"]}
          type="button"
          onClick={handleOnFotoClik}
        >
          <Icon classN="icon--foto" hrefName="foto" />
          <span>Изменить фото</span>
        </button>
      </div>
      {!isChange && (
        <div className={styles["profile__content"]}>
          <div className={styles["profile__heading"]}>
            <span className={styles["profile__heading-name"]}>{userData.full_name}</span>
            <Button
              whichClass="btn--edit"
              type="button"
              ariaLabel="Изменить данные пользователя"
              onClick={() => setIsChange(true)}
            >
              <Icon classN="icon--edit" hrefName="edit" />
            </Button>
          </div>
          <span className={styles["profile__category"]}>Страна:</span>
          <span className={styles["profile__city"]}>{userData.country}</span>
          <span className={styles["profile__category"]}>Город:</span>
          <span className={styles["profile__city"]}>{userData.city}</span>
          <span className={`${styles["profile__category"]} ${styles["profile__category--self"]}`}>
            О себе:
          </span>
          <span className={styles["profile__bio"]}>{userData.bio}</span>
        </div>
      )}
      {isChange && <ProfileForm onSave={() => setIsChange(false)} />}
    </section>
  );
};

export default ProfilePage;
