import styles from "./CustomFileInput.module.scss";
import Icon from "../Icon/Icon";
import clsx from "clsx";
import "../../art/styles/visually-hidden.scss";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  labelFor: string;
  errorMsg?: string;
  accept: string;
  iconClass?: string;
  iconHref?: string;
}

const CustomFileInput: React.FC<CustomInputProps> = ({
  labelText,
  labelFor,
  errorMsg,
  accept,
  iconClass,
  iconHref,
  ...inputProps
}) => {
  return (
    <div className={styles.upload} aria-label="Загрузите ваше фото">
      <label
        className={clsx(styles["upload__label"], {
          [styles["upload__label--error"]]: errorMsg,
        })}
        htmlFor={labelFor}
      >
        <input id={labelFor} autoComplete="off" accept={accept} hidden {...inputProps} />
        {iconClass && iconHref && <Icon classN={iconClass} hrefName={iconHref} />}
        <span className={styles["upload__label-text"]}>{labelText}</span>
      </label>
      <span
        className={clsx(styles["upload__error"], {
          [styles["upload__error--error"]]: errorMsg,
        })}
      >
        {errorMsg ? errorMsg : "Невидимый"}
      </span>
    </div>
  );
};

export default CustomFileInput;
