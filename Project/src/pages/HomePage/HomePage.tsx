import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/api";
import { PosrtsList } from "../../components/PostsList/PostsList";
import styles from "./HomePage.module.scss";
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const [visibleCount, setVisableCount] = useState(6);

  const navigate = useNavigate();

  const { data, isSuccess, isLoading, isError, error, refetch } = useQuery({
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


  if (isSuccess) {
    const visiblePost = data.slice(0, visibleCount);
    return (
      <section className={styles.home}>
        <PosrtsList data={visiblePost} />
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
