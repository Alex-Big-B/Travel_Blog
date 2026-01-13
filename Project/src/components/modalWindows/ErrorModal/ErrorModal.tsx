import styles from "./ErrorModal.module.scss";
import Button from "../../Button/Button";
import Icon from "../../Icon/Icon";
import { useAppDispatch, useAppSelector } from "../../../redux/hooksType";
import { changeIsError, resetErrorText } from "../../../redux/ErrorSlice";

const ErrorModal = () => {
  const errorMessage = useAppSelector((state) => state.error.errorText);
  const dispatch = useAppDispatch();

  const handelOnClick = () => {
    dispatch(resetErrorText());
    dispatch(changeIsError(false));
  };

  if (errorMessage) {
    return (
      <div className={styles.error}>
        <p className={styles["error__text"]}>Упс... Что-то пошло не так! :(</p>
        <p className={styles["error__text"]}>Перезагрузите страницу или проверте интернет соединение.</p>
        <Button
          whichClass="btn--close"
          type="button"
          ariaLabel="Кнопка закрыть окно"
          onClick={handelOnClick}
        >
          <Icon classN="icon--close" hrefName="close" />
        </Button>
      </div>
    );
  }
};

export default ErrorModal;
