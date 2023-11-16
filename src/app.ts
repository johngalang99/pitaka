import express, { Request, Response } from 'express';
import { addUser, getUserByEmail } from './db';
import * as bcrypt from 'bcrypt';
import { RegisterUserRequest, validateSchema } from './validators';
import * as jwt from 'jsonwebtoken';

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
    const hashedPassword = await bcrypt.hash(password, 10)
    await addUser(name, email, hashedPassword)
    res.send({ message: 'User created successfully' })
  } catch {
    res.status(500).send({ message: 'Error creating user' })
  }
})

app.post('/auth/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email)
  if (!user) {
    return res.status(400).send({ message: 'User does not exist' })
  }
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(400).send({ message: 'Incorrect password' })
  }
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
  }
  const token = jwt.sign(payload, 'secret', { expiresIn: '1h' })
  res.send({ message: 'User logged in successfully', token })
})

export default app;
