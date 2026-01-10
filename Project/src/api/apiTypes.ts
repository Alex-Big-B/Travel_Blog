import z from "zod";

// Схема регистрации и авторизации пользователя
export const UserAuthSchema = z.object({
  email: z.string(),
  password: z.string(),
});

// Тип регистрации и авторизации пользователя
export type UserAuth = z.infer<typeof UserAuthSchema>;

// Схема получения данных пользователя
export const UserSchema = z.object({
  id: z.number(),
  full_name: z.string(),
  city: z.string(),
  country: z.string(),
  bio: z.string(),
});

// Тип получения данных пользователя
export type User = z.infer<typeof UserSchema>;

// Схема получения предварительных данных поста
export const PostViewSchema = z.object({
  id: z.number(),
  title: z.string(),
  excerpt: z.string(),
  county: z.string(),
  city: z.string(),
  photo: z.string(),
});

// Тип олучения предварительных данных поста
export type PostView = z.infer<typeof PostViewSchema>;

// Схема получения предварительных данных всех постов
export const PostsSchema = z.array(PostViewSchema);

// Тип олучения предварительных данных всех постов
export type Posts = z.infer<typeof PostsSchema>;

// Схема получения полных данных поста
export const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  county: z.string(),
  city: z.string(),
  photo: z.string(),
  comments: z.array(
    z.object({
      author_name: z.string(),
      comment: z.string(),
      created_at: z.string(),
    })
  ),
  userInfo: z.object({
    full_name: z.string(),
    city: z.string(),
    bio: z.string(),
  }),
});

// Тип получения полных данных поста
export type Post = z.infer<typeof PostSchema>;

// Схема запроса добавления нового поста
export const AddPostRequestSchema = z.object({
  title: z.string(),
  description: z.string(),
  country: z.string(),
  city: z.string(),
  photo: z.string(),
});

// Тип запроса добавления нового поста
export type AddPostRequest = z.infer<typeof AddPostRequestSchema>;

// Схема ответа добавления нового поста
export const AddPostResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  country: z.string(),
  city: z.string(),
  photo: z.string(),
  comments: z.array(z.array(z.unknown())).default([[]]),
  userInfo: z.object({
    full_name: z.string(),
    city: z.string(),
    country: z.string(),
    bio: z.string(),
  }),
});

// Тип ответа добавления нового поста
export type AddPostResponse = z.infer<typeof AddPostResponseSchema>;

// Схема запроса добавления отзыва по id
export const AddCommentRequestSchema = z.object({
  id: z.number(),
  full_name: z.string(),
  comment: z.string(),
});

// Тип запроса добавления отзыва по id
export type AddCommentRequest = z.infer<typeof AddCommentRequestSchema>;

// Схема ответа добавления отзыва по id
export const AddCommentResponseSchema = z.object({
  author_name: z.string(),
  comment: z.string(),
  created_at: z.string(),
});

// Тип ответа добавления отзыва по id
export type AddCommentResponse = z.infer<typeof AddCommentResponseSchema>;
