import doctorResolvers from '@/modules/doctor/presentation/resolvers';
import { getSchema } from '@/modules/shared/infrastructure/persistence/graphql/schema';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/PrismaConnection';
import userResolvers from '@/modules/user/presentation/resolvers';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { DateTimeResolver, VoidResolver } from 'graphql-scalars';
import { NextRequest } from 'next/server';
const resolvers = {
  Query: {
    ping: () => {
      return 'pong';
    },
  },
  Mutation: {
    ...userResolvers.mutations,
    ...doctorResolvers.mutations,
  },
};
const apolloServer = new ApolloServer({
  typeDefs: [getSchema()],
  resolvers: {
    DateTime: DateTimeResolver,
    Void: VoidResolver,
    ...resolvers,
  },
});
const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer, {
  context: async (req, res) => ({
    req,
    res,
    db,
  }),
});
export async function GET(request: NextRequest) {
  return handler(request);
}
export async function POST(request: NextRequest) {
  return handler(request);
}
