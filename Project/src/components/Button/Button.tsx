import { ReactNode } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  whichClass: string;
  type: "button" | "submit" | "reset";
  ariaLabel: string;
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
}

const Button = ({ whichClass, type, ariaLabel, onClick, disabled, children }: ButtonProps) => {
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
};

export default Button;
