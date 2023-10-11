import dotenv from 'dotenv';

import app from './app';
import { testDbConnection } from './db';

dotenv.config()
async function startServer() {
  const port = process.env.PORT || 3000;

  app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
    await testDbConnection();
  });
}

startServer();
