import React from "react";

import styles from "./CostomTextarea.module.scss";
import Icon from "../Icon/Icon";

interface CostomTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelText: string;
  labelFor: string;
  hasError?: boolean;
}

const CostomTextarea: React.FC<CostomTextareaProps> = ({
  labelText,
  labelFor,
  hasError,
  ...textareaProps
}) => {
  const textareaClassName = hasError
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
      </div>
    </div>
  );
};

export default CostomTextarea;
