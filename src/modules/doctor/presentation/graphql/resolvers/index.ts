import { CreateDoctorResolver } from './create-doctor';
import { GetSpecialtiesResolver } from './get-specialties';
import { SetConsultingRoomResolver } from './set-consulting-room';
import { UpdateDoctorResolver } from './update-doctor';

const resolvers = {
  queries: {
    specialties: GetSpecialtiesResolver,
  },
  mutations: {
    createDoctor: CreateDoctorResolver,
    updateDoctor: UpdateDoctorResolver,
    setConsultingRoom: SetConsultingRoomResolver,
  },
};

export default resolvers;
