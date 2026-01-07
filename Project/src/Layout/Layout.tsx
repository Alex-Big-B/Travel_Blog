import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import "../art/styles/container.scss";
// import { AuthorizationPage } from "../pages/AuthorizationPage/AuthorizationPage";
// import { FeedbackForm } from "../components/forms/FeedbackForm/FeedbackForm";
// import { PostForm } from "../components/forms/PostForm/PostForm";

export const Layout = () => {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};
