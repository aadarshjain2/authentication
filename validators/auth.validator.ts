import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().transform((e) => e.toLowerCase()),
  password: z.string().min(6),
});

export const passwordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6),
});

export  const forgotPasswordSchema = z.object({
email: z.string().email(),
})

export const resetPasswordSchema = z.object({
  token : z.string() ,
   password: z.string().min(6),
})