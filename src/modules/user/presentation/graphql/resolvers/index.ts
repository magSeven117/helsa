import { CreateUserResolver } from './create-user-resolver';
import { UpdateBioResolver } from './update-bio-resolver';

const resolvers = {
  queries: {},
  mutations: {
    createUser: CreateUserResolver,
    updateBio: UpdateBioResolver,
  },
};

export default resolvers;
