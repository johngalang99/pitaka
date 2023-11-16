import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export const RegisterUserRequest = z.object({
  name: z.string(),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
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
