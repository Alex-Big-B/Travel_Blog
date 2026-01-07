import sprite from "../../art/sprite.svg";
import styles from "./Icon.module.scss";

interface IconProps {
  classN: string;
  hrefName: string;
}

const Icon = ({ classN, hrefName }: IconProps) => {
  return (
    <svg className={styles[classN]} aria-hidden="true" focusable="false">
      <use xlinkHref={`${sprite}#icon-${hrefName}`} />
    </svg>
  );
};

export default Icon;
