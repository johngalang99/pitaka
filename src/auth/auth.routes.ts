import { Router } from 'express';
import { getUsersCollection } from '../db';

export const authRoutes = Router();

authRoutes.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).send({ message: 'Missing fields' })
    }
    await getUsersCollection('users').insertOne({ name, email, password })
    res.send({ message: 'User created successfully' })
  } catch {
    res.status(500).send({ message: 'Error creating user' })
  }
})
