import { getDoctors } from '@/modules/doctor/presentation/actions/get-doctors';
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
  const doctors = await getDoctors(filters);

  return <DoctorList doctors={doctors} />;
};

export default DoctorListWrapper;
