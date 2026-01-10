import React from "react";

import styles from "./CostomTextarea.module.scss";
import Icon from "../Icon/Icon";

interface CostomTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelText: string;
  labelFor: string;
  errorMsg?: string;
}

const CostomTextarea: React.FC<CostomTextareaProps> = ({
  labelText,
  labelFor,
  errorMsg,
  ...textareaProps
}) => {
  const textareaClassName = errorMsg
    ? `${styles["field__textarea"]} ${styles["field__textarea--error"]}`
    : styles["field__textarea"];

  return (
    <div className={styles.field}>
      <label className={styles["field__label"]} htmlFor={labelFor}>
        <Icon classN="icon--flake" hrefName="flake" />
        <span className={styles["field__label-text"]}>{labelText}</span>
      </label>
      <div className={styles["field__wrapper"]}>
        <textarea className={textareaClassName} id={labelFor} {...textareaProps}></textarea>
        <Icon classN="icon--resizer" hrefName="resizer" />
        <div className={styles["field__inform"]}>
          <span
            className={
              errorMsg
                ? `${styles["field__error"]} ${styles["field__error--error"]}`
                : styles["field__error"]
            }
          >
            {errorMsg ? errorMsg : "Невидимый"}
          </span>

          <span className={styles["field__length"]}>0 / 2 000</span>
        </div>
      </div>
    </div>
  );
};

export default CostomTextarea;
