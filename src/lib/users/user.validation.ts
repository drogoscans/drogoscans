import { z } from "zod";
import { Role } from "@prisma/client";

export const createUserSchema = z
  .object({
    email: z.string().email().optional(),
    username: z.string().min(3).optional(),
    password: z.string().min(6),
    role: z.nativeEnum(Role).optional(),
  })
  .refine((data) => data.email || data.username, {
    message: "Either email or username must be provided.",
  });

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  username: z.string().min(3).optional(),
  password: z.string().min(6).optional(),
  role: z.nativeEnum(Role).optional(),
});
