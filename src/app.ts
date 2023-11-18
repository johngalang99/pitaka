import express, { Request, Response } from 'express';
import { addUser, createAccount, deleteAccountById, getAccountsByOwnerId, getUserByEmail, getUserById } from './db';
import * as bcrypt from 'bcrypt';
import { CreateBankAccountRequest, CreateBankAccountRequestSchema, RegisterUserRequest, RegisterUserRequestSchema, validateSchema, validateToken } from './validators';
import * as jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

const app = express();

app.use(express.json());

app.post('/auth/register', validateSchema(RegisterUserRequestSchema), async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body as RegisterUserRequest;
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
    _id: user._id,
    name: user.name,
    email: user.email,
  }
  const token = jwt.sign(payload, 'secret', { expiresIn: '1h' })
  res.send({ message: 'User logged in successfully', token })
})

app.get('/user/:id', validateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id)
    res.send(user)
  } catch (error) {
    res.status(404).send({ message: error.message })
  }
})

app.post('/account', validateToken, validateSchema(CreateBankAccountRequestSchema), async (req: Request, res: Response) => {
  const _id = new ObjectId(res.locals.user._id);
  const { name, initialBalance } = req.body as CreateBankAccountRequest;
  await createAccount(_id, name, initialBalance)
  res.send({ message: 'Account created!' })
})

app.get('/accounts/:ownerId', validateToken, async (req: Request, res: Response) => {
  const _id = new ObjectId(res.locals.user._id);
  const accounts = await getAccountsByOwnerId(_id)
  res.send(accounts)
})

app.delete('/account/:id', validateToken, async (req: Request, res: Response) => {
  const _id = new ObjectId(req.params.id)
  await deleteAccountById(_id)
})

export default app;
