import styles from "./CommentsList.module.scss";

type Comment = {
  author_name: string;
  comment: string;
  created_at: string;
};

type CommentsListProp = { comments: Comment[] };

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export const CommentsList = ({ comments }: CommentsListProp) => {
  return (
    <ul className={styles["comments-list"]}>
      {comments.map((feedback, index) => (
        <li className={styles["comments-list__item"]} key={index}>
          <span className={styles["comments-list__item-author"]}>{feedback.author_name}</span>
          <span className={styles["comments-list__item-data"]}>
            {formatDate(feedback.created_at)}
          </span>
          <p className={styles["comments-list__item-comment"]}>{feedback.comment}</p>
        </li>
      ))}
    </ul>
  );
};
