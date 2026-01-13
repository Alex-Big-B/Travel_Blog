import styles from "./Header.module.scss";
import "../../art/styles/container.scss";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";

import { fetchMe } from "../../api/api";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserProfileModal } from "../modalWindows/UserProfileModal/UserProfileModal";
import { useAppDispatch } from "../../redux/hooksType";
import { setUserData } from "../../redux/UserDataSlice";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);


  const dispatch = useAppDispatch();

  const { data, isSuccess, isError, error } = useQuery({
    queryFn: () => fetchMe(),
    queryKey: ["user", "me"],
    retry: 1,
    
  });

if(isSuccess) {
  dispatch(setUserData(data))
}


  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles["header__wrapper"]}>
          <Link to={"/"} className={styles["header__logo"]} aria-label="Ссылка на главную страницу">
            <Icon classN="icon--logo" hrefName="logo" />
            <span className={styles["header__logo-text"]}>Travel</span>
          </Link>

          {isSuccess ? (
            <button
              className={styles["header__profile"]}
              type="button"
              aria-label="Кнопка пользователь"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <img
                className={styles["header__profile-photo"]}
                src="/avatar_img.jpg"
                alt="Изображение пользователя"
              />
              <span className={styles["header__profile-name"]}>
                {data.full_name ? data.full_name : "Имя пользователя"}
              </span>
              <Icon
                classN="icon--polygon"
                modfy={isOpen ? "icon--polygon--rotate" : ""}
                hrefName="polygon"
              />
            </button>
          ) : (
            <Button
              whichClass="link--auth"
              ariaLabel="Ссылка на авторизацию"
              link={true}
              linkTo="/api/login"
            >
              Войти
            </Button>
          )}

          {isSuccess && (
            <UserProfileModal isOpen={isOpen} userData={data} closeModal={() => setIsOpen(false)} />
          )}
        </div>
        <hr className={styles["header__line"]} />

        {isSuccess ? (
          <span className={styles["header__title-login"]}>Истории ваших путешествий</span>
        ) : (
          <span className={styles["header__title"]}>Там, где мир начинается с путешествий</span>
        )}
      </div>
    </header>
  );
};
