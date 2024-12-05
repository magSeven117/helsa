import AppointmentSearchInput from '@/app/(client)/components/appointment/filter/appointment-search-input';
import { getAppointmentTypes } from '@/app/(server)/actions/doctor/get-appointment-types';
import { getSpecialties } from '@/app/(server)/actions/doctor/get-specialties';
import { AppointmentStatusEnum } from '@/modules/appointment/domain/status';

const Page = async () => {
  const responseSpecialties = await getSpecialties();
  const specialties = responseSpecialties?.data ?? [];
  const data = await getAppointmentTypes({ doctorId: '1' });
  const types = data?.data ?? [];
  return (
    <div className="grid grid-cols-1 w-full">
      <div className="flex px-5 py-7 w-full">
        <AppointmentSearchInput
          specialties={specialties}
          states={[...Object.values(AppointmentStatusEnum)]}
          types={types}
        />
      </div>
    </div>
  );
};

export default Page;
