import { Database } from '../db';
import { ObjectId } from 'mongodb';
import { User } from '../types';

export class UserDao {
  constructor(private db: Database) { }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.db.getCollection<User>('users').findOne({ email });
  }

  async getUserById(_id: string | ObjectId): Promise<User> {
    if (typeof _id === 'string') {
      _id = new ObjectId(_id);
    }
    const user = await this.db.getCollection<User>('users').findOne({ _id });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<void> {
    const user: User = {
      _id: new ObjectId(),
      name,
      email,
      password,
    }
    await this.db.getCollection<User>('users').insertOne(user)
  }
}
