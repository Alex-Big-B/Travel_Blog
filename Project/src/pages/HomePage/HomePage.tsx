import styles from "./HomePage.module.scss";
import { PostsList } from "../../components/PostsList/PostsList";
import Button from "../../components/Button/Button";
import HomePageSkeleton from "./HomePageSkeleton";

import { getPosts } from "../../api/api";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../redux/hooksType";
import { changeIsError, setErrorText } from "../../redux/ErrorSlice";

const HomePage = () => {
  const [visibleCount, setVisableCount] = useState(6);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryFn: () => getPosts(),
    queryKey: ["post", "all"],
  });

  // Обработчик скролла
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        setVisableCount((prev) => prev + 6);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) {
    return <HomePageSkeleton />;
  }

  if (isError) {
    dispatch(setErrorText(error.message));
    dispatch(changeIsError(true));
  }

  if (isSuccess) {
    const visiblePost = data.slice(0, visibleCount);
    return (
      <section className={styles.home}>
        <PostsList data={visiblePost} />
        <Button
          whichClass="btn--post"
          type="button"
          onClick={() => navigate("/api/posts")}
          ariaLabel="Добавить мое путешествие"
        >
          Добавить мое путешествие
        </Button>
      </section>
    );
  }
};

export default HomePage;
