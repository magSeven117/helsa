import { CreateUserResolver } from './CreateUserResolver';

const resolvers = {
  queries: {},
  mutations: {
    createUser: CreateUserResolver,
  },
};

export default resolvers;
