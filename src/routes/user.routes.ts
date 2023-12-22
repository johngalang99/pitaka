import { Express } from 'express';
import { UserController } from '../controllers/user.controller';
import { RegisterUserRequestSchema, validateSchema, validateToken } from '../validators';

export function setupUserRoutes(app: Express, userController: UserController) {
  app.post('/register',
    validateSchema(RegisterUserRequestSchema),
    userController.registerUser.bind(userController)
  );

  app.post('/login',
    userController.loginUser.bind(userController)
  );

  app.get('/user/:id',
    validateToken,
    userController.getUserById.bind(userController)
  );
}
