import styles from "./SuccessModal.module.scss";

import Icon from "../../Icon/Icon";
import Button from "../../Button/Button";
import { useAppDispatch, useAppSelector } from "../../../redux/hooksType";
import { resetSuccessText, toggleSuccess } from "../../../redux/SuccessSlice";

export const SuccessModal = () => {
  const successText = useAppSelector((state) => state.success.successText);
  const dispatch = useAppDispatch();

  const handelOnClick = () => {
    dispatch(resetSuccessText());
    dispatch(toggleSuccess(false));
  };

  return (
    <div className={styles.success}>
      <div className={styles["success__container"]}>
        <p className={styles["success__text"]}>{successText}</p>

        <Button
          whichClass="btn--close"
          type="button"
          ariaLabel="Кнопка закрыть окно"
          onClick={handelOnClick}
        >
          <Icon classN="icon--close" hrefName="close" />
        </Button>
      </div>
    </div>
  );
};
