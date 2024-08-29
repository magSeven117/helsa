import userResolvers from '@/modules/user/presentation/resolvers';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { DateTimeResolver, VoidResolver } from 'graphql-scalars';
import { NextRequest } from 'next/server';
import path from 'path';
const resolvers = {
  Query: {
    ping: () => {
      return 'pong';
    },
  },
  Mutation: {
    ...userResolvers.mutations,
  },
};
const apolloServer = new ApolloServer({
  typeDefs: loadSchemaSync(
    path.resolve(process.cwd(), './src/modules/shared/infrastructure/persistence/graphql/schema/**/*.graphql'),
    {
      loaders: [new GraphQLFileLoader()],
    }
  ),
  resolvers: {
    DateTime: DateTimeResolver,
    Void: VoidResolver,
    ...resolvers,
  },
});
const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer);
export async function GET(request: NextRequest) {
  return handler(request);
}
export async function POST(request: NextRequest) {
  return handler(request);
}
