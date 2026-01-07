import { useQuery } from "@tanstack/react-query";
import styles from "./PostPage.module.scss";
import { getPost } from "../../api/api";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const { postId } = useParams();

  const { data } = useQuery({
    queryFn: () => getPost(postId!),
    queryKey: ["post", "one", postId],
    enabled: !!postId,
  });
  console.log(data);
  return (
    <section className={styles.post}>
      <img className={styles["post__img"]} src="" alt="" />
      <div className={styles["post__wrapper"]}>
        <div className={styles["post__content"]}>
          <h1 className={styles["post__content-title"]}></h1>
          <p className={styles["post__content-paragraph"]}></p>
        </div>
        <ul className={styles["post__list"]}>
          <li className={styles["post__item"]}>
            <span className="author"></span>
            <span className="comment"></span>
            <span className="created"></span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default PostPage;
