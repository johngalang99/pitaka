import { Request, Response } from 'express';
import { Database } from './db';
import { RegisterUserRequest } from './validators';
import { Service } from './service';
import { ObjectId } from 'mongodb';


export class Controller {
  constructor(private service: Service) { }

  registerUser = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body as RegisterUserRequest;
      await this.service.registerUser(name, email, password)
      res.send({ message: 'User created successfully' })
    } catch (error) {
      res.status(error.status || 500).send({ message: error.message })
    }
  }

  loginUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const token = await this.service.loginUser(email, password);
      res.send({ message: 'User logged in successfully', token })
    } catch (error) {
      res.status(error.status || 500).send({ message: error.message })
    }
  }

  getUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await this.service.getUserById(id)
      res.send(user)
    } catch (error) {
      res.status(404).send({ message: error.message })
    }
  }

  createAccount = async (req: Request, res: Response) => {
    try {
      const { name, initialBalance } = req.body;
      const _id = new ObjectId(res.locals.user._id);
      await this.service.createAccount(_id, name, initialBalance)
      res.send({ message: 'Account created!' })
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  }

  getAccountsByOwnerId = async (req: Request, res: Response) => {
    try {
      const _id = new ObjectId(res.locals.user._id);
      const accounts = await this.service.getAccountsByOwnerId(_id)
      res.send(accounts)
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  }

  deleteAccountById = async (req: Request, res: Response) => {
    try {
      const _id = new ObjectId(req.params.id)
      await this.service.deleteAccountById(_id)
      res.send({ message: 'Account deleted!' })
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  }
}
