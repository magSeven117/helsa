import { getDoctors } from '@/modules/doctor/presentation/actions/get-doctors';
import DoctorCard from './doctor-card';

type Props = {
  filters: {
    q: string | null;
    specialties: string[] | null;
    availability: string | null;
    minRate: number | null;
    experience: number | null;
  };
};

const DoctorList = async ({ filters }: Props) => {
  const doctors2 = await getDoctors({
    q: filters.q as string,
    availability: filters.availability as string,
    minRate: filters.minRate as number,
    specialties: filters.specialties as string[],
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 px-5 my-5 gap-3">
      {doctors2.map((doctor, index) => {
        return <DoctorCard doctor={doctor} key={index} />;
      })}
    </div>
  );
};

export default DoctorList;
