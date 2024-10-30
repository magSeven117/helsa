'use client'
import { ApolloProvider } from "@apollo/client";
import client from "./apollo-connection";

export const ApolloContextProvider = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};