import { PrismaClient } from '@prisma/client';
import 'server-only';

const createPrismaClient = () =>
  new PrismaClient({
    log: ['error'],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const database = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = database;

export * from '@prisma/client';
