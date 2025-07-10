'use client';

import { Primitives } from '@helsa/ddd/types/primitives';
import { getAppointmentTypes, getSymptoms } from '@helsa/engine/appointment/infrastructure/api/http-appointment-api';
import { Doctor } from '@helsa/engine/doctor/domain/doctor';
import { useQueries } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';
import BookSheet from './book-sheet';
import DoctorCard from './doctor-card';

type Props = {
  doctors: Primitives<Doctor>[];
};
const DoctorList = ({ doctors }: Props) => {
  const { types, symptoms } = useQueries({
    queries: [
      {
        initialData: [],
        queryKey: ['types'],
        queryFn: async () => getAppointmentTypes(),
        refetchOnWindowFocus: false,
      },
      {
        initialData: [],
        queryKey: ['symptoms'],
        queryFn: async () => getSymptoms(),
        refetchOnWindowFocus: false,
      },
    ],
    combine: (results) => {
      const [types, symptoms] = results;
      return {
        types: types.data,
        symptoms: symptoms.data,
      };
    },
  });
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
      <BookSheet isOpen={Boolean(doctorId)} setOpen={setOpen} data={doctor} types={types} symptoms={symptoms} />
    </div>
  );
};

export default DoctorList;
