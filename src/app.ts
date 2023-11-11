import express, { Request, Response, NextFunction } from 'express';
import { getUsersCollection } from './db';
import { hash } from 'bcrypt';
import { z } from 'zod';

const app = express();

app.use(express.json());


const User = z.object({
  name: z.string(),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const isUserAlreadyRegistered = async (email: string) => {
  const user = await getUsersCollection('users').findOne({ email })
  return user
}

const validateSchema = (schema: z.ZodSchema<any>) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body)
    next()
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

app.post('/auth/register', validateSchema(User), async (req: Request, res: Response) => {
  try {
    const { name, email, password } = User.parse(req.body);
    const existingUser = await isUserAlreadyRegistered(email)
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

export default app;
