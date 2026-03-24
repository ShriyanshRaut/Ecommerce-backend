import { z } from "zod";

// Register validation
export const registerUserSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .trim(),

  email: z
    .string()
    .email("Invalid email format")
    .toLowerCase()
    .trim(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  avatar: z
    .string()
    .url("Avatar must be a valid URL"),
});

// Login validation
export const loginUserSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .toLowerCase()
    .trim(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});