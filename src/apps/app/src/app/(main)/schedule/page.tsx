import { getDoctor } from '@/src/actions/doctor/get-doctor';
import { getCurrentUser } from '@/src/actions/user/get-current-user';
import DoctorScheduleModal from '@/src/components/schedule/create-schedule';

const Page = async () => {
  const res = await getCurrentUser();
  const user = res?.data ?? null;
  if (!user) {
    return null;
  }
  const doctorResponse = await getDoctor({ userId: user.id });
  const doctor = doctorResponse?.data ?? null;
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
