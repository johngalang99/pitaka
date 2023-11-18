import { Collection, MongoClient, ObjectId, WithId } from 'mongodb';
import { Account, User } from './types'

const uri = 'mongodb://localhost:27017/pitaka?directConnection=true';
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

export const getUserById = async (_id: string | ObjectId): Promise<User> => {
  if (typeof _id === 'string') {
    _id = new ObjectId(_id);
  }
  const user = await getCollection<User>('users').findOne({ _id });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}

export const addUser = async (
  name: string,
  email: string,
  password: string,
): Promise<void> => {
  const user: User = {
    _id: new ObjectId(),
    name,
    email,
    password,
  }
  await getCollection<User>('users').insertOne(user)
}

export const createAccount = async (
  ownerId: ObjectId,
  name: string,
  initialBalance: number,
): Promise<void> => {
  const account: Account = {
    _id: new ObjectId(),
    name,
    ownerId,
    initialBalance,
    balance: initialBalance,
  }
  await getCollection<Account>('accounts').insertOne(account)
}

export const getAccountsByOwnerId = async (ownerId: ObjectId): Promise<Account[]> => {
  return await getCollection<Account>('accounts').find({ ownerId }).toArray()
}

export const deleteAccountById = async (id: ObjectId): Promise<void> => {
  await getCollection<Account>('accounts').deleteOne({ _id: id })
}
