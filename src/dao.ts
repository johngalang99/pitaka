import { Database } from './db';
import { ObjectId } from 'mongodb';
import { Account, User } from './types';

export class Dao {
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

  async createAccount(
    ownerId: ObjectId,
    name: string,
    initialBalance: number,
  ): Promise<void> {
    const account: Account = {
      _id: new ObjectId(),
      name,
      ownerId,
      initialBalance,
      balance: initialBalance,
    }
    await this.db.getCollection<Account>('accounts').insertOne(account)
  }

  async getAccountsByOwnerId(ownerId: ObjectId): Promise<Account[]> {
    return await this.db.getCollection<Account>('accounts').find({ ownerId }).toArray()
  }

  async getAccountById(id: ObjectId): Promise<Account> {
    const account = await this.db.getCollection<Account>('accounts').findOne({ _id: id })
    if (!account) {
      throw new Error('Account not found')
    }
    return account
  }

  async deleteAccountById(id: ObjectId): Promise<void> {
    await this.db.getCollection<Account>('accounts').deleteOne({ _id: id })
  }


}
