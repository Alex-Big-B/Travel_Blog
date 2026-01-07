import React from "react";

import styles from "./CustomInput.module.scss";
import Icon from "../Icon/Icon";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  labelFor: string;
  hasError?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  labelText,
  labelFor,
  hasError,
  ...inputProps
}) => {
  const inputClassName = hasError
    ? `${styles["field__input"]} ${styles["field__input--error"]}`
    : styles["field__input"];

  return (
    <div className={styles.field}>
      <label className={styles["field__label"]} htmlFor={labelFor}>
        <Icon classN="icon--flake" hrefName="flake" />
        <span className={styles["field__label-text"]}>{labelText}</span>
      </label>
      <input className={inputClassName} {...inputProps} />
      
    </div>
  );
};

export default CustomInput;
