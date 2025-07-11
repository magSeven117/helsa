import { CalendarView } from '@/src/components/schedule/calendar-view';
import DoctorScheduleModal from '@/src/components/schedule/create-schedule';

const Page = async () => {
  return (
    <div className="flex w-full h-full px-5 py-7 flex-col gap-5">
      <div>
        <DoctorScheduleModal />
      </div>
      <CalendarView />
    </div>
  );
};

export default Page;
