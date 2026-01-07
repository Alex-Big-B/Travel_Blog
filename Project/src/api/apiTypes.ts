import z from "zod";

export const UserSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export const PostViewSchema = z.object({
  id: z.number(),
  title: z.string(),
  excerpt: z.string(),
  county: z.string(),
  city: z.string(),
  photo: z.string(),
});

export type PostView = z.infer<typeof PostViewSchema>;

export const PostsSchema = z.array(PostViewSchema);

export type Posts = z.infer<typeof PostsSchema>;

export const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  country: z.string(),
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

export type Post = z.infer<typeof PostSchema>;

export const CommentSchema = z.object({
  id: z.number(),
  full_name: z.string(),
  comment: z.string(),
});

export type Comment = z.infer<typeof CommentSchema>