import { useLocation } from "react-router-dom";
import styles from "./ProfilePage.module.scss";
import Icon from "../../components/Icon/Icon";
import Button from "../../components/Button/Button";

const ProfilePage = () => {
  const location = useLocation();
  const userData = location.state;

  const handleoNEdit = () => {
    console.log(userData);
  };

  return (
    <section className={styles.profile}>
      <div className={styles["profile__photo"]}>
        <img
          className={styles["profile__photo-img"]}
          src="/avatar_img.jpg"
          alt="Изображение пользователя"
        />
        <button className={styles["profile__photo-btn"]}>
          <Icon classN="icon--foto" hrefName="foto" />
          <span>Изменить фото</span>
        </button>
      </div>
      <div className={styles["profile__content"]}>
        <div className={styles["profile__heading"]}>
          <span className={styles["profile__heading-name"]}>{userData.full_name}</span>
          <Button
            whichClass="btn--edit"
            type="button"
            ariaLabel="Изменить данные пользователя"
            onClick={handleoNEdit}
          >
            <Icon classN="icon--edit" hrefName="edit" />
          </Button>
        </div>
        <span className={styles["profile__category"]}>Город:</span>
        <span className={styles["profile__city"]}>{userData.city}</span>
        <span className={styles["profile__category"]}>О себе:</span>
        <span className={styles["profile__bio"]}>{userData.bio}</span>
      </div>
    </section>
  );
};

export default ProfilePage;
// {id: 89, full_name: 'dfdfsddd ddddd', city: '', country: '', bio: ''}
