import { getDoctor } from '@/modules/doctor/presentation/actions/get-doctor';
import { getCurrentUser } from '@/modules/user/presentation/actions/get-current-user';
import DoctorScheduleModal from './components/create-schedule';

const Page = async () => {
  const user = await getCurrentUser();
  const doctor = await getDoctor(user.id);
  return (
    <div className="flex w-full h-full">
      <DoctorScheduleModal doctorId={doctor.id} />
    </div>
  );
};

export default Page;
