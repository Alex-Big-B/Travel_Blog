import React from "react";

import styles from "./CostomTextarea.module.scss";
import Icon from "../Icon/Icon";

interface CostomTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelText: string;
  labelFor: string;
  errorMsg?: string;
  length?: string;
  value?: string;
  notFlake?: boolean;
}

const CostomTextarea: React.FC<CostomTextareaProps> = ({
  labelText,
  labelFor,
  errorMsg,
  length,
  value,
  notFlake,
  ...textareaProps
}) => {
  const textareaClassName = errorMsg
    ? `${styles["field__textarea"]} ${styles["field__textarea--error"]}`
    : styles["field__textarea"];

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
        <textarea className={textareaClassName} id={labelFor} {...textareaProps}>
          {value}
        </textarea>
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

          <span className={styles["field__length"]}>{length}</span>
        </div>
      </div>
    </div>
  );
};

export default CostomTextarea;
