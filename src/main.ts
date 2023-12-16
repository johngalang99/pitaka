import { Database } from './db';
import { Server } from './server';

const database = new Database();
const server = new Server(database);

server.start()
