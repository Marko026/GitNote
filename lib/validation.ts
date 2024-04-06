import * as z from "zod";

// i need pathname form params to make the schema dynamic
const pathname = "/onboarding";

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
  email: z.string().email().optional(),
  name: z.string().min(3).max(20),
  portfolio: z.string().min(3).max(100),
  image: z.string(),
  learningGoals: z
    .array(
      z.object({
        title: z.string().min(1).max(100),
        isChecked: z.boolean().optional(),
      })
    )
    .min(1)
    .max(10),
  knowledge: z
    .array(z.object({ title: z.string().min(1).max(100) }))
    .min(1)
    .max(10),
  techStack: z.string().min(1).max(100),
  availability: z.boolean(),
  startDate: z.date(),
  endDate: z.date(),
  onBoardingCompleted: z.boolean(),
});

export type IOnBoarding = z.infer<typeof onBoardingSchema>;

export const editProfileSchema = onBoardingSchema
  .pick({
    email: true,
    name: true,
    portfolio: true,
    image: true,
    learningGoals: true,
    knowledge: true,
    availability: true,
    startDate: true,
    endDate: true,
  })
  .extend({
    techStack: z
      .array(
        z.object({
          label: z.string().min(1),
          value: z.string().min(1),
        })
      )
      .min(1),
  });

export type IEditProfile = z.infer<typeof editProfileSchema>;

export type ICreatePost = z.infer<typeof createPostSchema>;
