import { getDoctor } from '@/src/actions/doctor/get-doctor';
import DoctorScheduleModal from '@/src/components/schedule/create-schedule';

const Page = async () => {
  const doctorResponse = await getDoctor();
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
