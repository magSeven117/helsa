import { getAppointmentTypes } from '@/src/actions/appointment/get-appointment-types';
import { searchDoctors } from '@/src/actions/doctor/search-doctors';
import DoctorList from './doctor-list';

type Props = {
  filters: {
    q?: string;
    specialties?: string[];
    availability?: string;
    minRate?: number;
    experience?: number;
  };
};

const DoctorListWrapper = async ({ filters }: Props) => {
  const response = await searchDoctors(filters);
  const data = await getAppointmentTypes();
  const doctors = response?.data ?? [];
  const types = data?.data ?? [];

  return <DoctorList doctors={doctors} types={types} />;
};

export default DoctorListWrapper;
