import { Request, Response } from 'express';

import UserService from './user.service';

class UserController {
  static async list(req: Request, res: Response) {
    try {
      const users = await UserService.list();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const user: User = req.body;
      const createdUser = await UserService.create(user);
      res.status(201).json(createdUser);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async get(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const user = await UserService.get(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const user: User = req.body;
      const updatedUser = await UserService.update(id, user);
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const deletedUser = await UserService.delete(id);
      if (deletedUser) {
        res.status(200).json(deletedUser);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default UserController;
