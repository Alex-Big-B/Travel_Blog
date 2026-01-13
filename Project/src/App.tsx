import { QueryClientProvider } from "@tanstack/react-query";
import "./art/styles/container.scss";
import { queryClient } from "./api/queryClient";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "./Layout/Layout";
import { HomePage } from "./pages/HomePage/HomePage";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import RegistrationForm from "./pages/RegistrationFormPage/RegistrationFormPage";
import LoginFormPage from "./pages/LoginFormPage/LoginFormPage";
import PostPage from "./pages/PostPage/PostPage";
import FeedbackFormPage from "./pages/FeedbackFormPage/FeedbackFormPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { PostFormPage } from "./pages/PostFormPage/PostFormPage";

function App() {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path={"/"} element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path={"api/login"} element={<LoginFormPage />} />
                <Route path={"api/register"} element={<RegistrationForm />} />
                <Route path={"api/user"} element={<ProfilePage />} />
                <Route path={"api/posts"} element={<PostFormPage />} />
                <Route path={"api/posts/:postId"} element={<PostPage />} />
                <Route path={"api/posts/:postId/comments"} element={<FeedbackFormPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
