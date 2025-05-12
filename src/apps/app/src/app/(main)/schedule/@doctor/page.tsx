import { getDoctor } from '@/src/actions/doctor/get-doctor';
import DoctorScheduleModal from '@/src/components/schedule/create-schedule';

const Page = async () => {
  const doctor = await getDoctor();
  if (!doctor) {
    return null;
  }
  return (
    <div className="flex w-full h-full px-5 py-7">
      <DoctorScheduleModal doctor={JSON.parse(JSON.stringify(doctor))} />
    </div>
  );
};

export default Page;
