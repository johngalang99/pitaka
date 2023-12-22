import { ObjectId } from 'mongodb';
import { Database } from '../db';
import { Account } from '../types';

export class AccountDao {
  constructor(private db: Database) { }

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
