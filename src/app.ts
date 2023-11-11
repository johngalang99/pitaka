import express from 'express';
import { getUsersCollection } from './db';
import { hash } from 'bcrypt';

const app = express();

app.use(express.json());

app.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send({ message: 'Missing fields' })
    }
    const hashedPassword = await hash(password, 10)
    await getUsersCollection('users').insertOne({ name, email, password: hashedPassword })
    res.send({ message: 'User created successfully' })
  } catch {
    res.status(500).send({ message: 'Error creating user' })
  }
})

export default app;
