import { CreatePatientResolver } from './create-patient';
import { UpdateBiometricResolver } from './update-biometric';
import { UpdateDemographicResolver } from './update-demographic';

const resolvers = {
  queries: {},
  mutations: {
    createPatient: CreatePatientResolver,
    updateDemographic: UpdateDemographicResolver,
    updateBiometric: UpdateBiometricResolver,
  },
};

export default resolvers;
