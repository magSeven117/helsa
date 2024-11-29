'use client';

import DoctorCard from './doctor-card';

type Props = {
  doctors: {
    id: string;
    name: string;
    image: string;
    score: number;
    specialty: string;
    experience: number;
  }[];
};
const DoctorList = ({ doctors }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 px-5 my-5 gap-3">
      {doctors.map((doctor, index) => {
        return <DoctorCard doctor={doctor} key={index} />;
      })}
    </div>
  );
};

export default DoctorList;
