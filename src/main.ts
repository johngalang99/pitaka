import prisma from './prisma/prisma-client';
import Server from './server';

const lawomServer = new Server(prisma);
lawomServer.start();
