import { MongoClient } from 'mongodb';
import { Database } from './db';

jest.mock('mongodb');

describe('Database', () => {
  let db: Database;

  beforeEach(() => {
    db = new Database();
  });

  it('should connect to the database', async () => {
    const connectSpy = jest.spyOn(MongoClient.prototype, 'connect');

    await db.connect();

    expect(connectSpy).toHaveBeenCalled();
  });

  it('should get a collection', () => {
    const mockCollection = jest.fn();
    const dbSpy = jest.spyOn(MongoClient.prototype, 'db').mockImplementation(() => ({
      collection: mockCollection
    } as any));

    db.getCollection('test');

    expect(dbSpy).toHaveBeenCalled();
    expect(mockCollection).toHaveBeenCalledWith('test');
  });
});
