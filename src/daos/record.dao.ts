import { ObjectId } from 'mongodb';
import { Database } from '../db';
import { Record, RecordType } from '../types';

export class RecordDao {
  constructor(private db: Database) { }

  async createRecord(
    accountId: ObjectId,
    amount: number,
    type: RecordType,
    description: string,
    date: Date
  ) {
    const record: Record = {
      _id: new ObjectId(),
      accountId,
      amount,
      type,
      description,
      date
    };
    await this.db.getCollection('records').insertOne(record);
  }

  // async getRecordsByOwnerId(ownerId) {
  //   return await this.db.getCollection('records').find({ ownerId }).toArray();
  // }

  // async getRecordById(id) {
  //   const record = await this.db.getCollection('records').findOne({ _id: id });
  //   if (!record) {
  //     throw new Error('Record not found');
  //   }
  //   return record;
  // }

  // async updateRecordBalanceById(id, balance) {
  //   await this.db.getCollection('records').updateOne({ _id: id }, { $set: { balance } });
  // }

  // async deleteRecordById(id) {
  //   await this.db.getCollection('records').deleteOne({ _id: id });
  // }
}
