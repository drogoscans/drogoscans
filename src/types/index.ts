import { Role } from '@prisma/client';

// Define the UserData interface for use in backend services
export interface UserData {
  id?: string;
  email?: string;
  username?: string;
  contactEmail?: string;
  password?: string;
  role?: Role;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define a User type for frontend use
export type User = {
  id: string;
  email: string;
  username: string; // No longer nullable, defaults to empty string if not provided
  contactEmail: string; // No longer nullable, defaults to empty string if not provided
  password: string; // No longer nullable, defaults to empty string if not provided
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};
