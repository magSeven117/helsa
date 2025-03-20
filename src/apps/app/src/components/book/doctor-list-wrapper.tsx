import { getAppointmentTypes } from '@/src/actions/appointment/get-appointment-types';
import { getSymptoms } from '@/src/actions/appointment/get-symptoms';
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
  const [responseDoctors, responseTypes, responseSymptoms] = await Promise.all([
    searchDoctors(filters),
    getAppointmentTypes(),
    getSymptoms(),
  ]);
  const symptoms = responseSymptoms?.data ?? [];
  const doctors = JSON.parse(JSON.stringify(responseDoctors?.data ?? []));
  const types = responseTypes?.data ?? [];

  return <DoctorList doctors={doctors} types={types} symptoms={symptoms} />;
};

export default DoctorListWrapper;
