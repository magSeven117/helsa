import doctorResolvers from '@/modules/doctor/presentation/graphql/resolvers';
import patientResolvers from '@/modules/patient/presentation/graphql/resolvers';
import { getSchema } from '@/modules/shared/infrastructure/persistence/graphql/schema';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import userResolvers from '@/modules/user/presentation/graphql/resolvers';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { DateTimeResolver, VoidResolver } from 'graphql-scalars';
import { NextRequest } from 'next/server';
const resolvers = {
  Query: {
    ping: () => {
      return 'pong';
    },
    ...doctorResolvers.queries,
  },
  Mutation: {
    ...userResolvers.mutations,
    ...doctorResolvers.mutations,
    ...patientResolvers.mutations,
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
