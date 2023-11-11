import app from './app';
import { connectToDatabase, getUsersCollection } from './db';

async function startServer() {
  await connectToDatabase()

  const port = process.env.PORT || 8000;

  app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer();
