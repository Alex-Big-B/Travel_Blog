import styles from "./CustomInput.module.scss";
import Icon from "../Icon/Icon";
import clsx from "clsx";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  labelFor: string;
  inputAutocomplete?: string;
  errorMsg?: string;
  notFlake?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  labelText,
  labelFor,
  inputAutocomplete,
  errorMsg,
  notFlake,
  ...inputProps
}) => {
  return (
    <div className={styles.field}>
      <label className={styles["field__label"]} htmlFor={labelFor}>
        {notFlake ? (
          <Icon classN="icon--flake" modfy="icon--flake--none" hrefName="flake" />
        ) : (
          <Icon classN="icon--flake" modfy="" hrefName="flake" />
        )}

        <span className={styles["field__label-text"]}>{labelText}</span>
      </label>
      <div className={styles["field__wrapper"]}>
        <input
          className={clsx(styles["field__input"], {
            [styles["field__input--error"]]: errorMsg,
          })}
          id={labelFor}
          autoComplete={inputAutocomplete}
          {...inputProps}
        />
        <span
          className={clsx(styles["field__error"], {
            [styles["field__error--error"]]: errorMsg,
          })}
        >
          {errorMsg ? errorMsg : "Невидимый"}
        </span>
      </div>
    </div>
  );
};

export default CustomInput;
