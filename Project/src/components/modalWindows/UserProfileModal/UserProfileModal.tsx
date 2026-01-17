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
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

export const UserProfileModal = ({
  isOpen,
  userData,
  closeModal,
  buttonRef,
}: UserProfileModalProp) => {
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
      if (!isOpen) return;

      const target = e.target as Node;

      if (buttonRef.current?.contains(target)) {
        return;
      }

      if (listRef.current && !listRef.current.contains(target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleOnClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleOnClickOutside);
    };
  }, [isOpen, closeModal, buttonRef]);

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
