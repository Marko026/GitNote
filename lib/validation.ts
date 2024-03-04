import * as z from "zod";

export const signInSchema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const createPost = z.object({
  title: z.string().min(3).max(20),
  postType: z.enum(["Light", "Dark", "System"]),
  tags: z.array(z.string()).min(1).max(3),
  description: z.string().min(30).max(100),
  lessons: z.array(z.string()).min(1).max(10),
  codeSnippet: z.string().min(10).max(5000),
  content: z.string().min(10).max(5000),
  recourse: z.array(z.string()).min(1).max(10),
});
