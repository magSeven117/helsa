'use client';

import { useSymptoms } from '@/src/modules/doctors/hooks/use-symptoms';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Doctor } from '@helsa/engine/doctor/domain/doctor';
import { useQueryState } from 'nuqs';
import { usePriceTypes } from '../../billing/hooks/use-prices';
import BookSheet from './book-sheet';
import DoctorCard from './doctor-card';

type Props = {
  doctors: Primitives<Doctor>[];
};
const DoctorList = ({ doctors }: Props) => {
  const { types } = usePriceTypes();
  const { symptoms } = useSymptoms();
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
