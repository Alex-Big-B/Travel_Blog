import { QueryClientProvider } from "@tanstack/react-query";
import "./art/styles/container.scss";
import { queryClient } from "./api/queryClient";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "./Layout/Layout";
import { Provider } from "react-redux";
import { store } from "./redux/store";




import { lazy, Suspense } from "react";
import { Loader } from "./components/Loader/Loader";


const HomePage = lazy(()=> import ("./pages/HomePage/HomePage"))
const LoginFormPage = lazy(()=> import ("./pages/LoginFormPage/LoginFormPage"))
const RegistrationFormPage = lazy(()=> import ("./pages/RegistrationFormPage/RegistrationFormPage"))
const ProfilePage = lazy(()=> import ("./pages/ProfilePage/ProfilePage"))
const PostFormPage = lazy(()=> import ("./pages/PostFormPage/PostFormPage"))
const PostPage = lazy(()=> import ("./pages/PostPage/PostPage"))
const FeedbackFormPage = lazy(()=> import ("./pages/FeedbackFormPage/FeedbackFormPage"))




function App() {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path={"/"} element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path={"api/login"} element={<LoginFormPage />} />
                  <Route path={"api/register"} element={<RegistrationFormPage />} />
                  <Route path={"api/user"} element={<ProfilePage />} />
                  <Route path={"api/posts"} element={<PostFormPage />} />
                  <Route path={"api/posts/:postId"} element={<PostPage />} />
                  <Route path={"api/posts/:postId/comments"} element={<FeedbackFormPage />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
