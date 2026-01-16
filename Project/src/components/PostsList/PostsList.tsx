import styles from "./PostsList.module.scss";
import { PostCard } from "../PostCard/PostCard";

import { Posts } from "../../api/apiTypes";
import { memo } from "react";

interface PostsListProp {
  data: Posts;
}

export const PostsList = memo(({ data }: PostsListProp) => {
  return (
    <ul className={styles.list}>
      {data.map((post) => (
        <li className={styles["list__item"]} key={post.id}>
          <PostCard data={post} />
        </li>
      ))}
    </ul>
  );
});
