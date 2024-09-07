import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

interface UserData {
  email?: string;
  username?: string;
  password?: string;
  role?: Role;
}

interface Filter {
  role?: Role;
}

export class UserService {
  // Create a new user
  async createUser(data: UserData) {
    if (!data.email && !data.username) {
      throw new Error("Either email or username must be provided.");
    }

    if (typeof data.role === "string") {
      data.role = data.role as Role;
    }

    const createData: any = {
      password: data.password,
      role: data.role ?? Role.USER,
    };

    if (data.email) {
      createData.email = data.email;
    }

    if (data.username) {
      createData.username = data.username;
    }

    return prisma.user.create({
      data: createData,
    });
  }

  // Get a user by ID
  async getUserById(userId: string) {
    return prisma.user.findUnique({ where: { id: userId } });
  }

  // Get all users with pagination, filter, and search
  async getAllUsers(
    page: number = 1,
    perPage: number = 12,
    filter: Filter = {},
    search: string = ""
  ) {
    const skip = (page - 1) * perPage;

    const roleFilter = filter.role ? (filter.role.toUpperCase() as Role) : undefined;

    const users = await prisma.user.findMany({
      where: {
        ...(roleFilter ? { role: roleFilter } : {}),
        OR: search
          ? [
              { email: { contains: search } },
              { username: { contains: search } },
            ]
          : undefined,
      },
      orderBy: {
        createdAt: "desc", // Sort by createdAt field in descending order
      },
      skip,
      take: perPage,
    });

    const totalUsers = await prisma.user.count({
      where: {
        ...(roleFilter ? { role: roleFilter } : {}),
        OR: search
          ? [
              { email: { contains: search } },
              { username: { contains: search } },
            ]
          : undefined,
      },
    });

    return { users, totalUsers };
  }

  // Update a user
  async updateUser(userId: string, data: Partial<UserData>) {
    if (data.role && typeof data.role === "string") {
      data.role = data.role as Role;
    }
    return prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  // Delete a user
  async deleteUser(userId: string) {
    return prisma.user.delete({
      where: { id: userId },
    });
  }
}
