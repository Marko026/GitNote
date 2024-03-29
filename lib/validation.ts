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
  _id: z.string().optional(),
  title: z.string().min(3).max(100),
  postType: z.enum(["WorkFlow", "Component", "Knowledge"]),
  tags: z
    .array(
      z.object({
        value: z.string().min(1).max(24),
        label: z.string().min(1).max(30, "Tag label must be less than 12"),
        __isNew__: z.boolean().optional(),
      })
    )
    .min(1)
    .max(5),
  description: z.string().min(30).max(1000),
  lessons: z.array(z.object({ title: z.string().min(1) })).max(10),
  codeSnippet: z.string().max(5000).optional(),
  content: z.string().max(5000).optional(),

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

export const onBoardingSchema = z.object({
  name: z.string().min(3).max(20),
  portfolio: z.string().min(3).max(100),
  image: z.string(),
  learningGoals: z
    .array(
      z.object({
        title: z.string().min(1).max(30),
        isChecked: z.boolean().optional(),
      })
    )
    .max(10),
  knowledgeLevel: z
    .array(z.object({ title: z.string().min(1).max(30) }))
    .max(10),
  techStack: z.string().min(3).max(100),
  acceptedTerms: z.boolean(),
  startDate: z.date(),
  endDate: z.date(),
});
export type IOnBoarding = z.infer<typeof onBoardingSchema>;

export type ICreatePost = z.infer<typeof createPostSchema>;
