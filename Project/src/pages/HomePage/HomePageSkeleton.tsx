import { memo } from "react";
import styles from "./HomePageSkeleton.module.scss";

const HomePageSkeleton = memo(() => {
  return (
    <div className={styles.skeleton}>
      <div className={styles["skeleton-list"]}>
        <div className={styles["skeleton-list__item"]}>
          <div className={styles["skeleton-list__item-img"]}></div>

          <div className={styles["skeleton-list__content"]}>
            <div className={styles["skeleton-list__content-title"]}></div>
            <div className={styles["skeleton-list__content-text"]}></div>
            <div
              className={`${styles["skeleton-list__content-text"]} ${styles["skeleton-list__content-text--l"]}`}
            ></div>
            <div
              className={`${styles["skeleton-list__content-text"]} ${styles["skeleton-list__content-text--xl"]}`}
            ></div>

            <div className={styles["skeleton-list__content-location"]}></div>
            <div className={styles["skeleton-list__content-else"]}></div>
          </div>
        </div>
        <div className={styles["skeleton-list__item"]}>
          <div className={styles["skeleton-list__item-img"]}></div>

          <div className={styles["skeleton-list__content"]}>
            <div className={styles["skeleton-list__content-title"]}></div>
            <div className={styles["skeleton-list__content-text"]}></div>
            <div
              className={`${styles["skeleton-list__content-text"]} ${styles["skeleton-list__content-text--l"]}`}
            ></div>
            <div
              className={`${styles["skeleton-list__content-text"]} ${styles["skeleton-list__content-text--xl"]}`}
            ></div>

            <div className={styles["skeleton-list__content-location"]}></div>
            <div className={styles["skeleton-list__content-else"]}></div>
          </div>
        </div>
        <div className={styles["skeleton-list__item"]}>
          <div className={styles["skeleton-list__item-img"]}></div>

          <div className={styles["skeleton-list__content"]}>
            <div className={styles["skeleton-list__content-title"]}></div>
            <div className={styles["skeleton-list__content-text"]}></div>
            <div
              className={`${styles["skeleton-list__content-text"]} ${styles["skeleton-list__content-text--l"]}`}
            ></div>
            <div
              className={`${styles["skeleton-list__content-text"]} ${styles["skeleton-list__content-text--xl"]}`}
            ></div>

            <div className={styles["skeleton-list__content-location"]}></div>
            <div className={styles["skeleton-list__content-else"]}></div>
          </div>
        </div>
        <div className={styles["skeleton-list__item"]}>
          <div className={styles["skeleton-list__item-img"]}></div>

          <div className={styles["skeleton-list__content"]}>
            <div className={styles["skeleton-list__content-title"]}></div>
            <div className={styles["skeleton-list__content-text"]}></div>
            <div
              className={`${styles["skeleton-list__content-text"]} ${styles["skeleton-list__content-text--l"]}`}
            ></div>
            <div
              className={`${styles["skeleton-list__content-text"]} ${styles["skeleton-list__content-text--xl"]}`}
            ></div>

            <div className={styles["skeleton-list__content-location"]}></div>
            <div className={styles["skeleton-list__content-else"]}></div>
          </div>
        </div>
        <div className={styles["skeleton-list__item"]}>
          <div className={styles["skeleton-list__item-img"]}></div>

          <div className={styles["skeleton-list__content"]}>
            <div className={styles["skeleton-list__content-title"]}></div>
            <div className={styles["skeleton-list__content-text"]}></div>
            <div
              className={`${styles["skeleton-list__content-text"]} ${styles["skeleton-list__content-text--l"]}`}
            ></div>
            <div
              className={`${styles["skeleton-list__content-text"]} ${styles["skeleton-list__content-text--xl"]}`}
            ></div>

            <div className={styles["skeleton-list__content-location"]}></div>
            <div className={styles["skeleton-list__content-else"]}></div>
          </div>
        </div>
        <div className={styles["skeleton-list__item"]}>
          <div className={styles["skeleton-list__item-img"]}></div>

          <div className={styles["skeleton-list__content"]}>
            <div className={styles["skeleton-list__content-title"]}></div>
            <div className={styles["skeleton-list__content-text"]}></div>
            <div
              className={`${styles["skeleton-list__content-text"]} ${styles["skeleton-list__content-text--l"]}`}
            ></div>
            <div
              className={`${styles["skeleton-list__content-text"]} ${styles["skeleton-list__content-text--xl"]}`}
            ></div>

            <div className={styles["skeleton-list__content-location"]}></div>
            <div className={styles["skeleton-list__content-else"]}></div>
          </div>
        </div>
      </div>

      <div className={styles["skeleton__buttons"]}></div>
    </div>
  );
});

export default HomePageSkeleton;
