import { memo } from "react";
import styles from "./PostPageSkeleton.module.scss";

const PostPageSkeleton = memo(() => {
  return (
    <div className={styles.skeleton}>
      <div className={styles["skeleton__img"]}></div>

      <div className={styles["skeleton__wrapper"]}>
        <div className={styles["skeleton__title"]}></div>

        <div className={styles["skeleton__content"]}>
          <div className={styles["skeleton__text"]}></div>
          <div className={`${styles["skeleton__text"]} ${styles["skeleton__text--xl"]}`}></div>
        </div>
        <div className={styles["skeleton__content"]}>
          <div className={`${styles["skeleton__text"]} ${styles["skeleton__text--l"]}`}></div>
          <div className={`${styles["skeleton__text"]} ${styles["skeleton__text--xl"]}`}></div>
          <div className={`${styles["skeleton__text"]} ${styles["skeleton__text--m"]}`}></div>
        </div>
        <div className={styles["skeleton__content"]}>
          <div className={styles["skeleton__text"]}></div>
          <div className={`${styles["skeleton__text"]} ${styles["skeleton__text--xl"]}`}></div>
        </div>
        <div className={styles["skeleton-list"]}>
          <div className={styles["skeleton-list__item"]}>
            <div className={styles["skeleton-list__item-author"]}></div>
            <div className={styles["skeleton-list__item-data"]}></div>
            <div className={styles["skeleton-list__item-comment"]}></div>
            <div className={styles["skeleton__content"]}>
              <div className={styles["skeleton__text"]}></div>
              <div className={`${styles["skeleton__text"]} ${styles["skeleton__text--xl"]}`}></div>
            </div>
          </div>
          <div className={styles["skeleton-list__item"]}>
            <div className={styles["skeleton-list__item-author"]}></div>
            <div className={styles["skeleton-list__item-data"]}></div>
            <div className={styles["skeleton-list__item-comment"]}></div>
            <div className={styles["skeleton__content"]}>
              <div className={styles["skeleton__text"]}></div>
              <div className={`${styles["skeleton__text"]} ${styles["skeleton__text--xl"]}`}></div>
            </div>
          </div>
          <div className={styles["skeleton-list__item"]}>
            <div className={styles["skeleton-list__item-author"]}></div>
            <div className={styles["skeleton-list__item-data"]}></div>
            <div className={styles["skeleton-list__item-comment"]}></div>
            <div className={styles["skeleton__content"]}>
              <div className={styles["skeleton__text"]}></div>
              <div className={`${styles["skeleton__text"]} ${styles["skeleton__text--xl"]}`}></div>
            </div>
          </div>
        </div>

        <div className={styles["skeleton__buttons"]}>
          <div className={styles["skeleton__buttons-btn"]}></div>
          <div className={styles["skeleton__buttons-btn"]}></div>
        </div>
      </div>
    </div>
  );
});

export default PostPageSkeleton;
