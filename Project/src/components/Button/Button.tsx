import { ReactNode } from "react";
import styles from "./Button.module.scss";
import { Link } from "react-router-dom";

interface ButtonProps {
  whichClass: string;
  type?: "button" | "submit" | "reset";
  ariaLabel: string;
  onClick?: () => void;
  disabled?: boolean;
  link?: boolean;
  linkTo?: string;
  children: ReactNode;
}

const Button = ({
  whichClass,
  type,
  ariaLabel,
  onClick,
  disabled,
  link,
  linkTo,
  children,
}: ButtonProps) => {
  if (link && linkTo) {
    return (
      <Link
        className={`${styles.link} ${styles[whichClass]}`}
        to={linkTo}
        type={type}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
        className={`${styles.btn} ${styles[whichClass]}`}
        type={type}
        aria-label={ariaLabel}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
};

export default Button;
