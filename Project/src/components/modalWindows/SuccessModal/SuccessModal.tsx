import styles from "./SuccessModal.module.scss";
import Icon from "../../Icon/Icon";
import Button from "../../Button/Button";

interface SuccessModalProps {
  successText: string;
  onClose: () => void;
}

export const SuccessModal = ({ successText, onClose }: SuccessModalProps) => {
  return (
    <div className={styles.success}>
      <div className={styles["success__container"]}>
        <p className={styles["success__text"]}>{successText}</p>

        <Button
          whichClass="btn--close"
          type="button"
          ariaLabel="Кнопка закрыть окно"
          onClick={onClose}
        >
          <Icon classN="icon--close" hrefName="close" />
        </Button>
      </div>
    </div>
  );
};
