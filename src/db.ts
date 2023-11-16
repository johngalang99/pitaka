import { Collection, MongoClient, ObjectId, WithId } from 'mongodb';
import { User } from './types'

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

export const getUsersCollection = <T>(collectionName: string): Collection<WithId<T>> => {
  const db = getDatabase();
  return db.collection<WithId<T>>(collectionName);
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await getUsersCollection<User>('users').findOne({ email })
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
  await getUsersCollection<User>('users').insertOne(user)
}

