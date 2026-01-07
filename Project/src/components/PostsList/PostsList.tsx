import { Posts } from "../../api/apiTypes";
import { PostCard } from "../PostCard/PostCard";
import styles from "./PostsList.module.scss";

interface PosrtsListProp {
  data: Posts;
}

export const PosrtsList = ({ data }: PosrtsListProp) => {
  return (
    <ul className={styles.list}>
      {data.map((post) => (
        <li className={styles["list__item"]} key={post.id}>
          <PostCard data={post} />
        </li>
      ))}
    </ul>
  );
};
