'use server';

import { Role } from '@prisma/client';
import { UserService } from './user.service';
import { createUserSchema, updateUserSchema } from './user.validation';

const userService = new UserService();

interface UserData {
  email?: string;
  username?: string;
  password?: string;
  role?: Role;
}

// Create a new user
export async function createUser(data: UserData) {
  const { success, error } = createUserSchema.safeParse(data);
  if (!success) throw new Error(error.errors.map(err => err.message).join(', '));

  return userService.createUser(data);
}

// Get all users with pagination, filter, and search
export async function getAllUsers(
  page: number = 1,
  perPage: number = 12,
  filter: { role?: Role } = {},
  search: string = ''
) {
  return userService.getAllUsers(page, perPage, filter, search);
}

// Get a user by ID
export async function getUserById(userId: string) {
  return userService.getUserById(userId);
}

// Update a user
export async function updateUser(userId: string, data: Partial<UserData>) {
  const { success, error } = updateUserSchema.safeParse(data);
  if (!success) throw new Error(error.errors.map(err => err.message).join(', '));

  return userService.updateUser(userId, data);
}

// Delete a user
export async function deleteUser(userId: string) {
  return userService.deleteUser(userId);
}
