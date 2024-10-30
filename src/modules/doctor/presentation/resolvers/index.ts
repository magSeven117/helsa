import { CreateDoctorResolver } from './create-doctor';
import { GetSpecialtiesResolver } from './get-specialties';

const resolvers = {
  queries: {
    specialties: GetSpecialtiesResolver,
  },
  mutations: {
    createDoctor: CreateDoctorResolver,
  },
};

export default resolvers;
