import styles from "./CustomInput.module.scss";
import Icon from "../Icon/Icon";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  labelFor: string;
  inputAutocomplete?: string;
  errorMsg?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  labelText,
  labelFor,
  inputAutocomplete,
  errorMsg,
  ...inputProps
}) => {
  return (
    <div className={styles.field}>
      <label className={styles["field__label"]} htmlFor={labelFor}>
        <Icon classN="icon--flake" hrefName="flake" />
        <span className={styles["field__label-text"]}>{labelText}</span>
      </label>
      <div className={styles["field__wrapper"]}>
        <input
          className={
            errorMsg
              ? `${styles["field__input"]} ${styles["field__input--error"]}`
              : styles["field__input"]
          }
          id={labelFor}
          autoComplete={inputAutocomplete}
          {...inputProps}
        />
        <span
          className={
            errorMsg
              ? `${styles["field__error"]} ${styles["field__error--error"]}`
              : styles["field__error"]
          }
        >
          {errorMsg ? errorMsg : "Невидимый"}
        </span>
      </div>
    </div>
  );
};

export default CustomInput;
