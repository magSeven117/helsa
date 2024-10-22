'use client'
import { ApolloProvider } from "@apollo/client";
import client from "./ApolloConnection";

export const ApolloContextProvider = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};