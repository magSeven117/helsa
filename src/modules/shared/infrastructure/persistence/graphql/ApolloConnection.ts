import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_BASE_URL}/graphql`,
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/graphql`,
  }),
});

export default client;
