import express, { Application, Request, Response } from 'express';
import pg, { QueryResult } from 'pg';

class Server {
  private app: Application;
  private db: pg.Pool;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.db = new pg.Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'lawomdb',
      password: 'mypassword',
      port: 5432,
    });
  }

  private async testDbConnection(): Promise<void> {
    const queryResult: QueryResult = await this.db.query('SELECT NOW()');
    console.log(`Connected to database at ${queryResult.rows[0].now}`);
  }

  private config() {
    // Add any necessary configuration here
    this.app.use(express.json());
  }

  private routes() {
    // Add your routes here
    this.app.get('/', async (req: Request, res: Response) => {
      const queryResult: QueryResult = await this.db.query('SELECT * FROM mytable');
      res.json(queryResult.rows);
    });
  }

  start() {
    // Start the server
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
      this.testDbConnection();
    });
  }
}

const lawomServer = new Server();
lawomServer.start()
