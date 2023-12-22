import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import * as jwt from 'jsonwebtoken';
import { RecordType } from './types';

export const RegisterUserRequestSchema = z.object({
  name: z.string(),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type RegisterUserRequest = z.infer<typeof RegisterUserRequestSchema>

export const CreateBankAccountRequestSchema = z.object({
  name: z.string(),
  initialBalance: z.number().min(0, 'Balance must be positive'),
})

export type CreateBankAccountRequest = z.infer<typeof CreateBankAccountRequestSchema>

export const CreateRecordRequestSchema = z.object({
  accountId: z.string(),
  amount: z.number().min(0, 'Amount must be positive'),
  type: z.nativeEnum(RecordType),
  description: z.string(),
  date: z.string().transform(value => new Date(value))
})

export type CreateRecordRequest = z.infer<typeof CreateRecordRequestSchema>

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

export const validateTokenOwner = async (req: Request, res: Response, next: NextFunction) => {
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
    if (payload._id !== req.params.id) {
      return res.status(403).send({ message: 'You are not authorized to access this resource' })
    }
    res.locals.user = payload;
    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({ message: 'Invalid token' })
    }
    res.status(500).send({ message: 'Error validating token' })
  }
}
