import express, { Request, Response } from 'express';
import { getUsersCollection } from './db';
import { hash } from 'bcrypt';
import { validateSchema } from './validators';
import { RegisterUserRequest } from './auth/auth';
import { getUserByEmail } from './auth/auth.dao';

const app = express();

app.use(express.json());

app.post('/auth/register', validateSchema(RegisterUserRequest), async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
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

app.post('/auth/login', async (req: Request, res: Response) => {
  console.log('login')
  res.send({ message: 'login' })
})

export default app;
