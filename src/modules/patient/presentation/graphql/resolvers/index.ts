import { CreatePatientResolver } from './create-patient';

const resolvers = {
  queries: {},
  mutations: {
    createPatient: CreatePatientResolver,
  },
};

export default resolvers;
