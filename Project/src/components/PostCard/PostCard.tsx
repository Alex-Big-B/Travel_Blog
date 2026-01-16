import styles from "./PostCard.module.scss";

import { PostView } from "../../api/apiTypes";
import { BASE_URL } from "../../api/api";

import { Link } from "react-router-dom";

interface PostCardProp {
  data: PostView;
}

export const PostCard = ({ data }: PostCardProp) => {

  return (
    <Link className={styles.post} to={`/api/posts/${data.id}`} aria-label={`Ссылка на пост ${data.title}`}>
      <img
        className={styles["post__img"]}
        src={`${BASE_URL}${data.photo}`}
        width={370}
        height={228}
        alt={`Изображение поста: ${data.title}`}
      />
      <div className={styles["post__content"]}>
        <h2 className={styles["post__content-title"]}>{data.title}</h2>
        <p className={styles["post__content-text"]}>{data.excerpt}</p>
        <span className={styles["post__content-place"]}>{`${data.county}, ${data.city} `}</span>

        <Link
          className={styles["post__content-link"]}
          to={`/posts/${data.id}`}
          aria-label={`Подробнее о посте ${data.title}`}
        >
          Подробнее
        </Link>
      </div>
    </Link>
  );
};
