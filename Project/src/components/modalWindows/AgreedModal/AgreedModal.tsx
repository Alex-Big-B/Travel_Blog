import styles from "./AgreedModal.module.scss";
import Icon from "../../Icon/Icon";
import Button from "../../Button/Button";
import { useAppDispatch, useAppSelector } from "../../../redux/hooksType";
import { changeAgreed, resetAgreedText } from "../../../redux/AgreedSlice";
import { useNavigate } from "react-router-dom";

export const AgreedModal = () => {
  const navigate = useNavigate();

  const agreedText = useAppSelector((state) => state.agreed.agreedText);
  const agreedNavigate = useAppSelector((state) => state.agreed.agreedNavigate);

  const dispatch = useAppDispatch();

  const handelOnClick = () => {
    dispatch(resetAgreedText());
    dispatch(changeAgreed(false));
    if (agreedNavigate) {
      navigate(agreedNavigate);
    }
  };

  return (
    <div className={styles.success}>
      <div className={styles["success__container"]}>
        <p className={styles["success__text"]}>{agreedText}</p>

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
