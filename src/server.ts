import { PrismaClient } from '@prisma/client';
import express, { Application, Request, Response } from 'express';

class Server {
  private app: Application;

  constructor(private prisma: PrismaClient) {
    this.app = express();
    this.config();
    this.routes();
  }

  private async testDbConnection(): Promise<void> {
    try {
      await this.prisma.$connect();
      console.log('Database connection successful!');
    } catch (e) {
      console.error('Database connection failed!', e);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  private config() {
    this.app.use(express.json());
  }

  private routes() {
    this.app.get('/', async (req: Request, res: Response) => {
      const users = await this.prisma.user.findMany();
      res.json('hello world');
    });
  }

  start() {
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
      this.testDbConnection()
    });
  }
}

export default Server;
