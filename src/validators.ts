import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import * as jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export const RegisterUserRequest = z.object({
  name: z.string(),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const CreateBankAccountRequest = z.object({
  name: z.string(),
  ownerId: z.instanceof(ObjectId),
  initialBalance: z.number().min(0, 'Balance must be positive'),
  balance: z.number().min(0, 'Balance must be positive'),
})

export const validateSchema = <T>(schema: z.ZodSchema<T>) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body)
    next()
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorDetails = error.errors.map(err => ({
        message: err.message,
        path: err.path.join('.'),
      }));
      res.status(400).send({ message: 'Validation error', errors: errorDetails });
    } else {
      res.status(500).send({ message: 'Error validating schema' });
    }
  }
}

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ message: 'No authorization header' })
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).send({ message: 'No token provided' })
    }
    const payload = jwt.verify(token, 'secret') as any;
    res.locals.user = payload;
    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({ message: 'Invalid token' })
    }
    res.status(500).send({ message: 'Error validating token' })
  }
}
