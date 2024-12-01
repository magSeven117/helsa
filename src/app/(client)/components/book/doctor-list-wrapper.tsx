import { searchDoctors } from '@/app/(server)/actions/doctor/search-doctors';
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
  const doctors = response?.data ?? [];

  return <DoctorList doctors={doctors} />;
};

export default DoctorListWrapper;
