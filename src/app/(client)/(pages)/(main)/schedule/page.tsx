import { getCurrentUser } from '@/app/(server)/actions/user/get-current-user';
import { getDoctor } from '@/modules/doctor/presentation/actions/get-doctor';
import DoctorScheduleModal from '../../../components/schedule/create-schedule';

const Page = async () => {
  const res = await getCurrentUser();
  const user = res?.data ?? null;
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
