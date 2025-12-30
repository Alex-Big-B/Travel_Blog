import styles from "./Header.module.scss";
import "../../art/styles/container.scss";
import { Link } from "react-router-dom";
import sprite from "../../art/sprite.svg";
// import { useState } from "react";

export const Header = () => {
  // const [isAuth, setIsAuth] = useState(false)

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles["header__wrapper"]}>
          <Link
            to={"/"}
            className={styles["header__logo"]}
            aria-label="Ссылка на главную страницу"
          >
            <svg
              className={styles["header__logo-icon"]}
              width={40.5}
              height={29.5}
              aria-hidden="true"
              focusable="false"
            >
              <use href={`${sprite}#icon-logo`} />
            </svg>

            <span className={styles["header__logo-text"]}>
              Travel
            </span>
          </Link>
          <button className={`${styles["header__button"]}`}>
            {/* {isAuth ? Войти : } */}
            Войти
          </button>
        </div>
        <hr className={styles["header__line"]}/>
        <span className={styles["header__title"]}>
          Там, где мир начинается с путешествий
        </span>
      </div>
    </header>
  );
};
