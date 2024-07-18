import { schema } from '@/modules/shared/infrastructure/presentation/graphql/gql-schema';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { DateTimeResolver } from 'graphql-scalars';
import { NextRequest } from 'next/server';
const resolvers = {
  Query: {
    hello: () => 'Word!',
    date: () => new Date(),
  },
};
const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers: {
    DateTime: DateTimeResolver,
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
