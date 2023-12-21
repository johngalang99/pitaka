import { Database } from './db';
import express from 'express';
import { Controller } from './controllers/controller';
import { Service } from './services/service';
import { setupRoutes } from './routes';
import { Dao } from './daos/dao';

export class Server {
  private app = express()
  private controller: Controller

  constructor(
    private database: Database,
    private port: number | string = process.env.PORT || 8000
  ) {
    const dao = new Dao(this.database);
    const service = new Service(dao);
    this.controller = new Controller(service);
    this.app.use(express.json());
    this.initializeRoutes();
  }

  async start() {
    try {
      await this.database.connect();
      this.app.listen(this.port, () => {
        console.log(`Server is running on port ${this.port}`);
      });
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  }

  initializeRoutes() {
    setupRoutes(this.app, this.controller);
  }
}
