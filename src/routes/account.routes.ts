import { Express } from 'express';
import { AccountController } from '../controllers/account.controller';
import { validateToken } from '../validators';

export function setupAccountRoutes(app: Express, accountController: AccountController) {
  app.post('/account',
    validateToken,
    accountController.createAccount.bind(accountController)
  );

  app.get('/account/:ownerId',
    validateToken,
    accountController.getAccountsByOwnerId.bind(accountController)
  );
}
