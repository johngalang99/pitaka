import { User } from '@prisma/client';

import UserDao from '../daos/user-dao';

class UserService {
  static async list(): Promise<User[]> {
    const users = await UserDao.list();
    return users;
  }

  static async create(user: User): Promise<User> {
    const createdUser = await UserDao.create(user);
    return createdUser;
  }

  static async get(id: number): Promise<User | null> {
    const user = await UserDao.get(id);
    return user;
  }

  static async update(id: number, user: User): Promise<User | null> {
    const updatedUser = await UserDao.update(id, user);
    return updatedUser;
  }

  static async delete(id: number): Promise<User | null> {
    const deletedUser = await UserDao.delete(id);
    return deletedUser
  }
}

export default UserService;
