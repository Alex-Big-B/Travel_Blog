import styles from "./UserProfileModal.module.scss";

import { Link, useNavigate } from "react-router-dom";
import Button from "../../Button/Button";
import { useMutation } from "@tanstack/react-query";
import { userLogout } from "../../../api/api";
import { queryClient } from "../../../api/queryClient";
import { User } from "../../../api/apiTypes";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "../../../redux/hooksType";
import { resetUserData } from "../../../redux/UserDataSlice";

interface UserProfileModalProp {
  isOpen: boolean;
  userData: User;
  closeModal: () => void;
}

export const UserProfileModal = ({ isOpen, userData, closeModal }: UserProfileModalProp) => {
  const navigate = useNavigate();
  const listRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const { mutate } = useMutation({
    mutationFn: () => userLogout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      closeModal();
      alert("Пользователь вышел");
    },
    onError: (errors) => {
      console.log("useMutation:", errors.message);
    },
  });

  // Клик мышью за пределами модального окна
  useEffect(() => {
    const handleOnClickOutside = (e: MouseEvent) => {
      if (!isOpen) {
        return;
      }
      if (listRef.current && !listRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleOnClickOutside);
    return () => {
      document.addEventListener("mousedown", handleOnClickOutside);
    };
  });

  return (
    <div
      className={isOpen ? `${styles.modal} ${styles["modal--open"]}` : styles.modal}
      ref={listRef}
    >
      <Link
        className={styles["modal__link"]}
        to={"/api/user"}
        state={userData}
        onClick={closeModal}
        aria-label="Ссылка на страницу о пользователе"
      >
        Профиль
      </Link>
      <Button
        whichClass="btn--logout"
        type="button"
        ariaLabel="Выйти из профиля"
        onClick={() => {
          mutate();
          dispatch(resetUserData());
          navigate("/");
        }}
      >
        Выйти
      </Button>
    </div>
  );
};
