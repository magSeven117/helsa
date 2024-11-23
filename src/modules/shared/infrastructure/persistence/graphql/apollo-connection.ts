import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { env } from '../../config/env';

const client = new ApolloClient({
  uri: `${env.NEXT_PUBLIC_BASE_URL}/graphql`,
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `${env.NEXT_PUBLIC_BASE_URL}/api/graphql`,
  }),
});

export default client;
