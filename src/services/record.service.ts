import { ObjectId } from 'mongodb';
import { AccountDao } from '../daos/account.dao';
import { RecordDao } from '../daos/record.dao';
import { RecordType } from '../types';
import { CreateRecordRequest } from '../validators';

export class RecordService {
  constructor(
    private recordDao: RecordDao,
    private accountDao: AccountDao
  ) { }

  async createRecord(
    request: CreateRecordRequest
  ) {
    const { accountId, amount, type, description, date } = request;
    const objectAccoundId = new ObjectId(accountId);
    await this.recordDao.createRecord(objectAccoundId, amount, type, description, date);
    const account = await this.accountDao.getAccountById(objectAccoundId);

    let newBalance = account.balance;
    if (type === RecordType.Expense) {
      newBalance -= amount;
    } else if (type === RecordType.Income) {
      newBalance += amount;
    }

    await this.accountDao.updateAccountBalanceById(objectAccoundId, newBalance);
  }
  // async getRecordsByOwnerId(ownerId) {
  //   return await this.recordDao.getRecordsByOwnerId(ownerId);
  // }
  // async getRecordById(id) {
  //   return await this.recordDao.getRecordById(id);
  // }
  // async updateRecordBalanceById(id, balance) {
  //   await this.recordDao.updateRecordBalanceById(id, balance);
  // }
  // async deleteRecordById(id) {
  //   await this.recordDao.deleteRecordById(id);
  // }
}
