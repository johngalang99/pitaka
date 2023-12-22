import { MongoClient, ClientSession } from 'mongodb';

export class MongoTransaction {
  private session: ClientSession;

  constructor(private client: MongoClient) {
    this.session = this.client.startSession();
  }

  start() {
    this.session.startTransaction();
  }

  async commit() {
    await this.session.commitTransaction();
  }

  async abort() {
    await this.session.abortTransaction();
  }

  end() {
    this.session.endSession();
  }

  getSession() {
    return this.session;
  }
}
