import { getDoctor } from '@/modules/doctor/presentation/actions/get-doctor';
import { getCurrentUser } from '@/modules/user/presentation/actions/get-current-user';
import DoctorScheduleModal from './components/create-schedule';

const Page = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }
  const doctor = await getDoctor(user.id);
  if (!doctor) {
    return null;
  }
  return (
    <div className="flex w-full h-full px-5 py-7">
      <DoctorScheduleModal doctor={doctor} />
    </div>
  );
};

export default Page;
