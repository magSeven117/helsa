import { CreatePatientResolver } from './create-patient';
import { UpdateDemographicResolver } from './update-demographic';

const resolvers = {
  queries: {},
  mutations: {
    createPatient: CreatePatientResolver,
    updateDemographic: UpdateDemographicResolver,
  },
};

export default resolvers;
