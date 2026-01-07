import styles from "./Header.module.scss";
import "../../art/styles/container.scss";
import Icon from "../Icon/Icon";

import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles["header__wrapper"]}>
          <Link to={"/"} className={styles["header__logo"]} aria-label="Ссылка на главную страницу">
            <Icon classN="icon--logo" hrefName="logo" />
            <span className={styles["header__logo-text"]}>Travel</span>
          </Link>

          <button
            className={`${styles["header__button"]}`}
            type="button"
            aria-label="Кнопка авторизации"
            onClick={() => navigate("/api/login")}
          >
            {/* {isAuth ? Войти : } */}
            Войти
          </button>
        </div>
        <hr className={styles["header__line"]} />
        <span className={styles["header__title"]}>Там, где мир начинается с путешествий</span>
      </div>
    </header>
  );
};
