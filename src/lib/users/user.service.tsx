import { PrismaClient, Role } from '@prisma/client'; 

const prisma = new PrismaClient();

export class UserService {
  // Create a new user
  async createUser(data: { email: string; password?: string; image?: string; role?: Role }) {
    return prisma.user.create({ data });
  }

  // Get a user by ID
  async getUserById(userId: number) {
    return prisma.user.findUnique({ where: { id: userId } });
  }

  // Get all users
  async getAllUsers() {
    return prisma.user.findMany();
  }

  // Update a user
  async updateUser(
    userId: number,
    data: { email?: string; password?: string; image?: string; role?: Role }
  ) {
    return prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  // Delete a user
  async deleteUser(userId: number) {
    return prisma.user.delete({
      where: { id: userId },
    });
  }
}
