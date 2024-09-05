import { z } from 'zod';
import { Role } from '@prisma/client'; 

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  image: z.string().url().optional(),
  role: z.nativeEnum(Role).optional(), 
});

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  image: z.string().url().optional(),
  role: z.nativeEnum(Role).optional(), 
});
