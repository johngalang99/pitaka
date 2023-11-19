import express from 'express'
import { RegisterUserRequestSchema, validateSchema } from '../validators';
import { authController } from './auth.controller';

const authRouter = express.Router();

authRouter.post('/register', validateSchema(RegisterUserRequestSchema), authController.registerUser)
authRouter.post('/login', authController.loginUser)

export default authRouter;
