import { CreateDoctorResolver } from './create-doctor';

const resolvers = {
  queries: {},
  mutations: {
    createUser: CreateDoctorResolver,
  },
};

export default resolvers;
