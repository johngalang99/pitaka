import express, { NextFunction, Request, Response } from 'express';
import { createAccount, deleteAccountById, getAccountsByOwnerId, getUserById } from './db';
import { CreateBankAccountRequest, CreateBankAccountRequestSchema, validateSchema, validateToken } from './validators';
import { ObjectId } from 'mongodb';
import authRouter from './auth/auth.routes';

const app = express();

const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
};

app.use(loggingMiddleware);
app.use(express.json());

app.use('/auth', authRouter);


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

app.get('/account/:ownerId', validateToken, async (req: Request, res: Response) => {
  const _id = new ObjectId(res.locals.user._id);
  const accounts = await getAccountsByOwnerId(_id)
  res.send(accounts)
})

app.delete('/account/:id', validateToken, async (req: Request, res: Response) => {
  const _id = new ObjectId(req.params.id)
  await deleteAccountById(_id)
})

export default app;
