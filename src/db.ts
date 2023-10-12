import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017/lawom?retryWrites=false&w=majority&directConnection=true';
const client = new MongoClient(uri);

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export function getDatabase() {
  return client.db();
}

export function getUsersCollection(collectionName: string) {
  const db = getDatabase();
  return db.collection(collectionName);
}
