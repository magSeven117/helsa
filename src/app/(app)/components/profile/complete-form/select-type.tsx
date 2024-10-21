'use client';

import doctorImage from '@/assets/images/nutritionist.png';
import patientImage from '@/assets/images/ophthalmology.png';
import { useComplete } from './context';
import { Footer } from './footer-step';

const SelectType = () => {
  const { setTypeUser, state } = useComplete();
  const onContinue = async (type: 'PATIENT' | 'DOCTOR') => {
    setTypeUser(type);
  };
  return (
    <div className="h-full w-full min-w-[600px] flex flex-col justify-center items-center box-border p-3 mb-3">
      <div className="w-3/4 mb-8">
        <p className="text-xl font-bold text-center">Are you a doctor or a patient?</p>
      </div>
      <div className="w-3/4 flex flex-col gap-3 justify-center items-center sm:flex-row sm:mb-16">
        <div
          className={`flex justify-center items-center flex-col h-[300px] w-1/2 p-4 border-2 border-primary rounded-lg gap-3 cursor-pointer transition-all ease-in-out ${
            state.type === 'DOCTOR' ? 'bg-primary' : ''
          }`}
          onClick={() => onContinue('DOCTOR')}
        >
          <img src={doctorImage.src} className="h-14" alt="" />
          <p className="text-lg font-bold">Doctor</p>
          <p className="text-center">Professional health personnel, determined to improve and save lives</p>
        </div>
        <div
          className={`flex justify-center items-center flex-col h-[300px] w-1/2 p-4 border-2 border-primary rounded-lg gap-3 cursor-pointer transition-all ease-in-out delay-75 ${
            state.type === 'PATIENT' ? 'bg-primary' : ''
          }`}
          onClick={() => onContinue('PATIENT')}
        >
          <img src={patientImage.src} className="h-14" alt="" />
          <p className="text-lg font-bold">Patient</p>
          <p className="text-center">I need help to improve my health</p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default SelectType;
