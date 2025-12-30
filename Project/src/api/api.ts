import { User, PostsSchema, Posts } from "./apiTypes";
import { validateResponse } from "./validateResponse";

const BASE_URL = "http://localhost/api";

// Авторизация пользователя
export const userLoging = ({
  email,
  password,
}: User): Promise<void> => {
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
export const userRegister = ({
  email,
  password,
}: User): Promise<void> => {
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
    .then((response) => response.json());

// Получение всех постов

export const getPosts = (): Promise<Posts>=> 
  fetch(`${BASE_URL}/posts`)
.then(validateResponse)
.then((response) => response.json())
.then((data)=> PostsSchema.parse(data))
