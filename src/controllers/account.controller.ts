import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { AccountService } from '../services/account.service';

export class AccountController {
  constructor(private accountService: AccountService) { }

  async createAccount(req: Request, res: Response) {
    try {
      const { name, initialBalance } = req.body;
      const _id = new ObjectId(res.locals.user._id);
      await this.accountService.createAccount(_id, name, initialBalance)
      res.send({ message: 'Account created!' })
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  }

  async getAccountsByOwnerId(req: Request, res: Response) {
    try {
      const _id = new ObjectId(res.locals.user._id);
      const accounts = await this.accountService.getAccountsByOwnerId(_id)
      res.send(accounts)
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  }

  async deleteAccountById(req: Request, res: Response) {
    try {
      const _id = new ObjectId(req.params.id)
      await this.accountService.deleteAccountById(_id)
      res.send({ message: 'Account deleted!' })
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  }
}
