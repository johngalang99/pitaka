import { Collection, MongoClient, ObjectId, WithId } from 'mongodb';
import { Account, User } from './types'
export class Database {
  private client: MongoClient;
  private uri: string = 'mongodb://localhost:27017/pitaka?directConnection=true';

  constructor() {
    this.client = new MongoClient(this.uri);
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

  getDatabase() {
    return this.client.db();
  }

  getCollection<T>(collectionName: string): Collection<WithId<T>> {
    const db = this.getDatabase();
    return db.collection<WithId<T>>(collectionName);
  }
}




