import { memo } from "react";
import sprite from "../../art/sprite.svg";
import styles from "./Icon.module.scss";

interface IconProps {
  classN: string;
  modfy?: string;
  hrefName: string;
}

const Icon = memo(({ classN, modfy, hrefName }: IconProps) => {
  const classModfy = modfy && styles[modfy];

  return (
    <svg className={`${styles[classN]} ${classModfy}`} aria-hidden="true" focusable="false">
      <use xlinkHref={`${sprite}#icon-${hrefName}`} />
    </svg>
  );
});

export default Icon;
