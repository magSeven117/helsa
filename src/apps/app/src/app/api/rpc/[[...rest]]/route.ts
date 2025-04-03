import { apiRouter } from '@helsa/api/source/router';
import { database } from '@helsa/database';
import { RPCHandler, serve } from '@orpc/server/next';

const handler = new RPCHandler(apiRouter);

export const { GET, POST, PUT, PATCH, DELETE } = serve(handler, {
  prefix: '/api/rpc',
  context: async (req) => {
    return {
      database: database,
    };
  },
});
