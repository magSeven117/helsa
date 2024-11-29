import { getDoctors } from '@/modules/doctor/presentation/actions/get-doctors';
import DoctorList from './doctor-list';

type Props = {
  filters: {
    q: string | null;
    specialties: string[] | null;
    availability: string | null;
    minRate: number | null;
    experience: number | null;
  };
};

const DoctorListWrapper = async ({ filters }: Props) => {
  const doctors = await getDoctors({
    q: filters.q as string,
    availability: filters.availability as string,
    minRate: filters.minRate as number,
    specialties: filters.specialties as string[],
    experience: filters.experience as number,
  });

  return <DoctorList doctors={doctors} />;
};

export default DoctorListWrapper;
