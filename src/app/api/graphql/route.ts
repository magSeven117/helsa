import { ApolloServer } from '@apollo/server';
import { NextRequest } from 'next/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import path from 'path';
import { readFileSync } from 'fs';
import { DateTimeResolver } from 'graphql-scalars';
const resolvers = {
  Query: {
    hello: () => 'Word!',
    date: () => new Date(),
  },
};
const apolloServer = new ApolloServer({
  typeDefs: readFileSync(
    path.join(process.cwd(), 'graphql/schema.graphql'),
    'utf8'
  ),
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
