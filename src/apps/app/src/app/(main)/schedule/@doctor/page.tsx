import { CalendarView } from '@/src/modules/schedule/components/calendar-view';
import DoctorScheduleModal from '@/src/modules/schedule/components/create-schedule';

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
