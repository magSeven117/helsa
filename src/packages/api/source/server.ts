import { BetterUser, getSession } from '@helsa/auth/server';
import { database, PrismaClient } from '@helsa/database';
import { os } from '@orpc/server';

export interface ServerMeta {
  name?: string;
}

export type ServerContext = { user?: BetterUser; database?: PrismaClient };

export const base = os.$meta<ServerMeta>({}).$context<ServerContext>();

const loggerMiddleware = base.middleware(async ({ context, next, procedure }) => {
  const start = Date.now();

  const result = await next();

  const end = Date.now();

  console.log(`[ORPC] ${procedure['~orpc'].meta.name}  took ${end - start}ms to execute`);

  return result;
});

const authMiddleware = base.middleware(async ({ context, next }) => {
  const session = await getSession();
  if (!session || !session.user) {
    throw new Error('Unauthorized');
  }

  return next({
    context: {
      ...context,
      user: session.user,
    },
  });
});

export const publicProcedure = base.use(loggerMiddleware);
export const protectedProcedure = base.use(loggerMiddleware).use(authMiddleware);

export const createContext = async () => {
  return {
    database,
  };
};
