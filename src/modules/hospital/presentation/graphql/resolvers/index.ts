import { CreateHospitalResolver } from './create-hospital';
import { UpdateHospitalResolver } from './update-hospital';

const resolvers = {
  queries: {},
  mutations: {
    createHospital: CreateHospitalResolver,
    updateHospital: UpdateHospitalResolver,
  },
};

export default resolvers;
