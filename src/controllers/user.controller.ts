import { Request, Response } from 'express';
import { RegisterUserRequest } from '../validators';
import { UserService } from '../services/user.service';

export class UserController {
  constructor(private userService: UserService) { }

  async registerUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body as RegisterUserRequest;
      await this.userService.registerUser(name, email, password)
      res.send({ message: 'User created successfully' })
    } catch (error) {
      res.status(error.status || 500).send({ message: error.message })
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await this.userService.loginUser(email, password);
      res.send({ message: 'User logged in successfully', token })
    } catch (error) {
      res.status(error.status || 500).send({ message: error.message })
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id)
      res.send(user)
    } catch (error) {
      res.status(404).send({ message: error.message })
    }
  }
}
