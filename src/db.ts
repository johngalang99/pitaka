import { Collection, MongoClient, ObjectId, WithId } from 'mongodb';
import { Account, User } from './types'

const uri = 'mongodb://localhost:27017/lawom?directConnection=true';
const client = new MongoClient(uri);

export const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export const getDatabase = () => {
  return client.db()
}

export const getCollection = <T>(collectionName: string): Collection<WithId<T>> => {
  const db = getDatabase();
  return db.collection<WithId<T>>(collectionName);
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await getCollection<User>('users').findOne({ email })
}

export const addUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const user: User = {
    _id: new ObjectId(),
    name,
    email,
    password,
  }
  await getCollection<User>('users').insertOne(user)
}

export const createAccount = async (
  name: string,
  ownerId: ObjectId,
  initialBalance: number,
  balance: number,
) => {
  const account: Account = {
    _id: new ObjectId(),
    name,
    ownerId,
    initialBalance,
    balance,
  }
  await getCollection<Account>('accounts').insertOne(account)
}

