import gql from 'graphql-tag';
import { CreateUserResolver } from './CreateUserResolver';

const resolvers = {
  queries: {},
  mutations: {
    createUser: CreateUserResolver,
  },
};

export default resolvers;

export const schema = gql`
  enum Role {
    DOCTOR
    PATIENT
  }

  """
  User type
  """
  type User {
    id: ID!
    externalId: String!
    email: String!
    role: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type UserCollection implements Collection {
    totalCount: Int
    pageInfo: PageInfo
    items: [User]
  }

  input UserInput {
    id: String!
    externalId: String!
    email: String!
    role: Role!
  }

  type Mutation {
    createUser(user: UserInput!): Void
  }
`;
