import { Request, Response } from 'express';
import { RegisterUserRequest } from '../validators';
import { loginUser, registerUser } from './auth.service';

export const authController = {
  registerUser: async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body as RegisterUserRequest;
      await registerUser(name, email, password)
      res.send({ message: 'User created successfully' })
    } catch (error) {
      res.status(error.status || 500).send({ message: error.message })
    }
  },

  loginUser: async (req: Request, res: Response) => {
    try {

      const { email, password } = req.body;
      const token = await loginUser(email, password);
      res.send({ message: 'User logged in successfully', token })
    } catch (error) {
      res.status(error.status || 500).send({ message: error.message })
    }
  }
}
