import app from './app';
import { MongoClient } from 'mongodb';
import { connectToDatabase } from './db';

const uri = 'mongodb://localhost:27017/lawom?retryWrites=false&w=majority&directConnection=true';
const client = new MongoClient(uri)

async function startServer() {
  await connectToDatabase()

  const port = process.env.PORT || 3000;

  app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
  });
}

async function insertUser(user: { username: string; email: string }) {
  try {
    const db = client.db();
    const usersCollection = db.collection('users');

    const result = await usersCollection.insertOne(user);
    console.log('User inserted:', result.insertedId);
  } catch (error) {
    console.error('Error inserting user:', error);
  }
}

const newUser = {
  username: 'john_doe',
  email: 'john@example.com',
};

// insertUser(newUser);

startServer();
