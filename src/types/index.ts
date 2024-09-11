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
  id : string
  username: string | null;
  contactEmail: string | null;  
  email: string | null;
  role: Role;
  createdAt: Date;
};
