import {
  PostsSchema,
  Posts,
  Post,
  PostSchema,
  UserAuth,
  User,
  UserSchema,
  AddCommentRequest,
  AddCommentResponse,
  AddCommentResponseSchema,
  AddPostRequest,
  ChangeUserPasswordRequest,
  ChangeUserPasswordResponse,
  ChangeUserPasswordResponseSchema,
} from "./apiTypes";
import { validateResponse } from "./validateResponse";

export const BASE_URL = "https://travelblog.skillbox.cc";

interface AuthResponseToken {
  token: string;
}

// Авторизация пользователя
export const userLoging = ({ email, password }: UserAuth): Promise<void> => {
  return fetch(`${BASE_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((data: AuthResponseToken) => localStorage.setItem("authToken", data.token));
};

// Регистрация пользователя
export const userRegister = ({ email, password }: UserAuth): Promise<AuthResponseToken> => {
  return fetch(`${BASE_URL}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((data: AuthResponseToken) => data);
};

// Выход пользователя
interface LogoutResponse {
  message: string;
}

export const userLogout = (): Promise<LogoutResponse> => {
  return fetch(`${BASE_URL}/api/logout`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((data: LogoutResponse) => {
      localStorage.removeItem("authToken");
      return data;
    });
};

// Получение данных пользователя
export const fetchMe = (): Promise<User> =>
  fetch(`${BASE_URL}/api/user`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => UserSchema.parse(data));

// Получение всех постов
export const getPosts = (): Promise<Posts> =>
  fetch(`${BASE_URL}/api/posts`)
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => PostsSchema.parse(data));

// Получение поста по id
export const getPost = (id: string): Promise<Post> =>
  fetch(`${BASE_URL}/api/posts/${id}`)
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => PostSchema.parse(data));

// Добавить новый пост
export const addPost = ({
  title,
  description,
  country,
  city,
  photo,
}: AddPostRequest): Promise<void> => {
  const formData = new FormData();

  formData.append("title", title);
  formData.append("description", description);
  formData.append("country", country);
  formData.append("city", city);
  formData.append("photo", photo);

  return fetch(`${BASE_URL}/api/posts/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    body: formData,
  })
    .then(validateResponse)
    .then(() => undefined);
};

// Добавить отзыв по id
export const addComment = ({
  id,
  full_name,
  comment,
}: AddCommentRequest): Promise<AddCommentResponse> =>
  fetch(`${BASE_URL}/api/posts/${id}/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ full_name, comment }),
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => AddCommentResponseSchema.parse(data));

// Изменить пароль пользователя
export const changeUserPassword = ({
  password,
}: ChangeUserPasswordRequest): Promise<ChangeUserPasswordResponse> =>
  fetch(`${BASE_URL}/api/user/password`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => ChangeUserPasswordResponseSchema.parse(data));

// Изменить данные пользователя
export interface changeUserDataRequest {
  full_name?: string;
  city?: string;
  country?: string;
  bio?: string;
}

export const changeUserData = ({
  full_name,
  city,
  country,
  bio,
}: changeUserDataRequest): Promise<User> =>
  fetch(`${BASE_URL}/api/user`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ full_name, city, country, bio }),
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => UserSchema.parse(data));
