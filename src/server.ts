import { Database } from './db';
import express from 'express';
import { UserService } from './services/user.service';
import { UserDao } from './daos/user.dao';
import { AccountDao } from './daos/account.dao';
import { AccountService } from './services/account.service';
import { AccountController } from './controllers/account.controller';
import { UserController } from './controllers/user.controller';
import { setupUserRoutes } from './routes/user.routes';
import { setupAccountRoutes } from './routes/account.routes';

export class Server {
  private app = express()

  constructor(private database: Database) { }

  async start() {
    const accountDao = new AccountDao(this.database);
    const userDao = new UserDao(this.database);
    const userService = new UserService(userDao);
    const accountService = new AccountService(accountDao);
    const userController = new UserController(userService);
    const accountController = new AccountController(accountService);
    this.app.use(express.json());
    setupUserRoutes(this.app, userController);
    setupAccountRoutes(this.app, accountController);

    try {
      await this.database.connect();
      this.app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT || 8000}`);
      });
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  }
}
