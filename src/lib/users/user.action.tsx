'use server';

import { UserService } from './user.service';
import { createUserSchema, updateUserSchema } from './user.validation';

const userService = new UserService();

// Create a new user
export async function createUser(data: any) {
  const validation = createUserSchema.safeParse(data);
  if (!validation.success) {
    throw new Error(validation.error.errors.map((err) => err.message).join(', '));
  }

  return userService.createUser(validation.data);
}

// Get all users
export async function getAllUsers() {
  return userService.getAllUsers();
}

// Get a user by ID
export async function getUserById(userId: number) {
  return userService.getUserById(userId);
}

// Update a user
export async function updateUser(userId: number, data: any) {
  const validation = updateUserSchema.safeParse(data);
  if (!validation.success) {
    throw new Error(validation.error.errors.map((err) => err.message).join(', '));
  }

  return userService.updateUser(userId, validation.data);
}

// Delete a user
export async function deleteUser(userId: number) {
  return userService.deleteUser(userId);
}
