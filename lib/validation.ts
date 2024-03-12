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

export const createPostSchema = z.object({
  title: z.string().min(3).max(100),
  postType: z.enum(["WorkFlow", "Component", "Knowledge"]),
  tags: z
    .array(
      z.object({
        value: z.string().min(1).max(32),
        label: z.string().min(1).max(12),
        __isNew__: z.boolean().optional(),
      })
    )
    .min(1)
    .max(10),
  description: z.string().min(30).max(1000),
  lessons: z
    .array(z.object({ title: z.string().min(1) }))
    .min(1)
    .max(10),
  codeSnippet: z.string().min(10).max(5000),
  content: z.string().min(10).max(5000),
  resources: z
    .array(
      z.object({
        label: z.string().min(1),
        resource: z.string().min(1),
      })
    )
    .min(1)
    .max(10),
});

export type ICreatePost = z.infer<typeof createPostSchema>;
