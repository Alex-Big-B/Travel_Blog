import styles from "./UserProfileModal.module.scss";

import { Link } from "react-router-dom";
import Button from "../../Button/Button";
import { useMutation } from "@tanstack/react-query";
import { userLogout } from "../../../api/api";
import { queryClient } from "../../../api/queryClient";
import { User } from "../../../api/apiTypes";

type UserProfileModalProp = { isOpen: boolean, userData: User };

export const UserProfileModal = ({ isOpen, userData }: UserProfileModalProp) => {
  const { mutate } = useMutation({
    mutationFn: () => userLogout(),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      console.log("useMutation:", response);
      alert("Пользователь вышел");
    },
    onError: (errors) => {
      console.log("useMutation:", errors.message);
    },
  });

  return (
    <div className={isOpen ? `${styles.modal} ${styles["modal--open"]}` : styles.modal}>
      <Link
        className={styles["modal__link"]}
        to={"/api/profile"}
        state={userData}
        aria-label="Ссылка на страницу о пользователе"
      >
        Профиль
      </Link>
      <Button whichClass="btn--logout" type="button" ariaLabel="Выйти из профиля" onClick={mutate}>
        Выйти
      </Button>
    </div>
  );
};
