import z from "zod";

export const userValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    bio: z.string().optional(),
    profilePhoto: z.string().optional(),
    coverPhoto: z.string().optional(),
  }),
});

export const loginValidationSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});
