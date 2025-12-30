import z from "zod";

export const UserSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export const PostsSchema = z.object({
  id: z.number(),
  title: z.string(),
  excerpt: z.string(),
  photo: z.string(),
});

export type Posts = z.infer<typeof PostsSchema>;
