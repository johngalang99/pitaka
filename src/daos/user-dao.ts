import { User } from '@prisma/client';

import { prisma } from '../db';

class UserDao {
  static async list(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users;
  }

  static async create(user: User): Promise<User> {
    const createdUser = await prisma.user.create({ data: user });
    return createdUser;
  }

  static async get(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  }

  static async update(id: number, user: User): Promise<User | null> {
    const updatedUser = await prisma.user.update({ where: { id }, data: user });
    return updatedUser;
  }

  static async delete(id: number): Promise<User | null> {
    const deletedUser = await prisma.user.delete({ where: { id } });
    return deletedUser;
  }
}

export default UserDao;
