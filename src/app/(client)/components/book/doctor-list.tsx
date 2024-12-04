'use client';

import { AppointmentType } from '@/modules/doctor/domain/appointment-type';
import { Doctor } from '@/modules/doctor/domain/doctor';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { useQueryState } from 'nuqs';
import BookSheet from './book-sheet';
import DoctorCard from './doctor-card';

type Props = {
  doctors: Primitives<Doctor>[];
  types: Primitives<AppointmentType>[];
};
const DoctorList = ({ doctors, types }: Props) => {
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
      <BookSheet isOpen={Boolean(doctorId)} setOpen={setOpen} data={doctor} types={types} />
    </div>
  );
};

export default DoctorList;
