import { getDoctor } from '@/modules/doctor/presentation/actions/get-doctor';
import { getCurrentUser } from '@/modules/user/presentation/actions/get-current-user';
import ProfessionalInfo from './components/professional-info';

const Page = async () => {
  const user = await getCurrentUser();
  const doctor = await getDoctor(user.id);
  return (
    <div className="space-y-6 w-full">
      <ProfessionalInfo
        doctor={{
          id: doctor.id,
          licenseMedicalNumber: doctor.licenseMedicalNumber,
          consultingRoomAddress: doctor.consultingRoomAddress,
          experience: doctor.experience,
          specialtyId: doctor.specialtyId,
          educations: doctor.educations,
        }}
      />
    </div>
  );
};

export default Page;
