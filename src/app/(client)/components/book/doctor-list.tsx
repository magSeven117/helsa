'use client';

import { useQueryState } from 'nuqs';
import BookSheet from './book-sheet';
import DoctorCard from './doctor-card';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { Doctor } from '@/modules/doctor/domain/doctor';

type Props = {
  doctors: Primitives<Doctor>[];
};
const DoctorList = ({ doctors }: Props) => {
  const [doctorId, setDoctorId] = useQueryState('id');
  const setOpen = (id: string | boolean) => {
    if (id) {
      setDoctorId(id as string);
    } else {
      setDoctorId(null);
    }
  };
  const doctor = doctors.find((doctor) => doctor.id === doctorId);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 px-5 my-5 gap-3">
      {doctors.map((doctor, index) => {
        return <DoctorCard doctor={doctor} key={index} />;
      })}
      <BookSheet isOpen={Boolean(doctorId)} setOpen={setOpen} data={doctor} />
    </div>
  );
};

export default DoctorList;
