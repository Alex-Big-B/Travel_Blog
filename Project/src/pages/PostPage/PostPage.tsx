import { useQuery } from "@tanstack/react-query";
import styles from "./PostPage.module.scss";
import { BASE_URL, getPost } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { CommentsList } from "../../components/CommentsList/CommentsList";
import Button from "../../components/Button/Button";
import Icon from "../../components/Icon/Icon";

const PostPage = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryFn: () => getPost(postId!),
    queryKey: ["post", "one", postId],
    enabled: !!postId,
  });

  const handelObClik = () => {
    if (localStorage.getItem("authToken")) {
      navigate(`/api/posts/${postId}/comments`);
    } else {
      navigate("/api/login");
    }
  };

  if (isError) {
    console.log(error.message);
  }

  if (isSuccess) {
    return (
      <section className={styles.post}>
        <img
          className={styles["post__img"]}
          src={`${BASE_URL}${data.photo}`}
          alt={`Изобрадение к посту ${data.title}`}
        />
        <div className={styles["post__wrapper"]}>
          <div className={styles["post__content"]}>
            <h1 className={styles["post__content-title"]}>{data.title}</h1>
            <p className={styles["post__content-paragraph"]}>{data.description}</p>
          </div>

          {data.id && data.comments.length > 0 && <CommentsList comments={data.comments} />}

          <div className={styles["post__buttons"]}>
            <Button
              whichClass="btn--toggle"
              type="button"
              ariaLabel="Кнопка вернуться назад"
              onClick={() => navigate(-1)}
            >
              <Icon classN="icon--arrow-left" hrefName="arrow-left" />
              <span> Назад</span>
            </Button>

            <Button
              whichClass="btn--submit"
              type="button"
              onClick={handelObClik}
              ariaLabel="Оставить свой отзыв"
            >
              Ваше впечатление об этом месте
            </Button>
          </div>
        </div>
      </section>
    );
  }
};

export default PostPage;
