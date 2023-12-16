import { RegisterUserRequestSchema, validateSchema, validateToken } from './validators';
import { Controller } from './controller';
import { Express } from 'express';

export function setupRoutes(app: Express, controller: Controller) {
  app.post('/register', validateSchema(RegisterUserRequestSchema), controller.registerUser.bind(controller));
  app.post('/login', controller.loginUser.bind(controller));
  app.get('/user/:id', validateToken, controller.getUserById.bind(controller));
  app.post('/account', validateToken, controller.createAccount.bind(controller));
  app.get('/account/:ownerId', validateToken, controller.getAccountsByOwnerId.bind(controller));
}
