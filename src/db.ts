import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export async function testDbConnection() {
  try {
    await prisma.$connect();
    console.log('Database connection successful!');
  } catch (e) {
    console.error('Database connection failed!', e);
  } finally {
    await prisma.$disconnect();
  }
}
