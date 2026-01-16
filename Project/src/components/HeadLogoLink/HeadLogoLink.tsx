import { Link } from "react-router-dom";
import styles from "./HeadLogoLink.module.scss";
import Icon from "../Icon/Icon";
import { memo } from "react";

export const HeadLogoLink = memo(() => {
  return (
    <Link to={"/"} className={styles.logo} aria-label="Ссылка на главную страницу">
      <Icon classN="icon--logo" hrefName="logo" />
      <span className={styles["logo__text"]}>Travel</span>
    </Link>
  );
});
