import express from 'express';
import { getUsersCollection } from './db';
import { hash } from 'bcrypt';

const app = express();

app.use(express.json());

app.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await isUserAlreadyRegistered(email)
    if (user) {
      return res.status(400).send({ message: 'User already exists' })
    }
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


const isUserAlreadyRegistered = async (email: string) => {
  const user = await getUsersCollection('users').findOne({ email })
  return user
}



export default app;
