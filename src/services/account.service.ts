import { ObjectId } from 'mongodb';
import { AccountDao } from '../daos/account.dao';

export class AccountService {
  constructor(private accountDao: AccountDao) { }

  async createAccount(ownerId: ObjectId, name: string, initialBalance: number) {
    return await this.accountDao.createAccount(ownerId, name, initialBalance)
  }

  async getAccountsByOwnerId(ownerId: ObjectId) {
    return await this.accountDao.getAccountsByOwnerId(ownerId)
  }

  async deleteAccountById(id: ObjectId) {
    return await this.accountDao.deleteAccountById(id)
  }
}

