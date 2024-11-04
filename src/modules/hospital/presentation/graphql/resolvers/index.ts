import { CreateHospitalResolver } from './create-hospital';

const resolvers = {
  queries: {},
  mutations: {
    createHospital: CreateHospitalResolver,
  },
};

export default resolvers;
