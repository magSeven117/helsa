import { AddEducationResolver } from './add-education';
import { CreateDoctorResolver } from './create-doctor';
import { EditEducationResolver } from './edit-education';
import { GetSpecialtiesResolver } from './get-specialties';
import { RemoveEducationResolver } from './remove-education';
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
    addEducation: AddEducationResolver,
    editEducation: EditEducationResolver,
    removeEducation: RemoveEducationResolver,
  },
};

export default resolvers;
