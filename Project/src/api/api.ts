import { User, PostsSchema, Posts, Post, PostSchema, Comment } from "./apiTypes";
import { validateResponse } from "./validateResponse";

const BASE_URL = "https://travelblog.skillbox.cc/api";

// Авторизация пользователя
export const userLoging = ({ email, password }: User): Promise<void> => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(validateResponse)
    .then(() => undefined);
};

// Регистрация пользователя
export const userRegister = ({ email, password }: User): Promise<void> => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(validateResponse)
    .then(() => undefined);
};

interface LogoutResponse {
  message: string;
}

// Выход пользователя
export const userLogout = (): Promise<LogoutResponse> =>
  fetch(`${BASE_URL}/logout`, { credentials: "include" })
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => JSON.parse(data));

// Получение всех постов
export const getPosts = (): Promise<Posts> =>
  fetch(`${BASE_URL}/posts`)
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => PostsSchema.parse(data));

// Получение поста по id
export const getPost = (id: string): Promise<Post> =>
  fetch(`${BASE_URL}/posts/${id}`)
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => PostSchema.parse(data));

// Добавить отзыв по id
export const setComment = ({ id, full_name, comment }: Comment) => {
  fetch(`${BASE_URL}/posts/${id}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, full_name, comment }),
  });
};
// interface SetCommentResponse {
//   id: number;
//   post_id: number;
//   author_name: string;
//   comment: string;
//   created_at: string;
// }