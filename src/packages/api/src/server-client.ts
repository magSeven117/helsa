import { getSession } from '@helsa/auth/server';
import { database } from '@helsa/database';
import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await getSession();
  const user = session?.user;
  return {
    database,
    user,
    ...opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().meta<{ name: string }>().create({
  transformer: superjson,
});

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  const result = await next();

  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

  return result;
});

const authMiddleware = t.middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new Error('Unauthorized');
  }

  return next({ ctx: { ...ctx, user: ctx.user! as Required<typeof ctx.user> } });
});

export const publicProcedure = t.procedure.use(timingMiddleware);
export const protectedProcedure = t.procedure.use(timingMiddleware).use(authMiddleware);
