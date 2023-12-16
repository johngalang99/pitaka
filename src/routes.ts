import { RegisterUserRequestSchema, validateSchema, validateToken } from './validators';
import { Controller } from './controller';
import { Express } from 'express';

export function setupRoutes(app: Express, controller: Controller) {
  app.post('/register', validateSchema(RegisterUserRequestSchema), controller.registerUser);
  app.post('/login', controller.loginUser);
  app.get('/user/:id', validateToken, controller.getUserById);
  app.post('/account', validateToken, controller.createAccount);
  app.get('/account/:ownerId', validateToken, controller.getAccountsByOwnerId);
}
