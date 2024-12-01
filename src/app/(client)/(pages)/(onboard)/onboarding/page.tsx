import { getSpecialties } from '@/app/(server)/actions/doctor/get-specialties';
import DoctorForm from '../../../components/onboard/doctor-form';
import HospitalForm from '../../../components/onboard/hospital-form';
import PatientForm from '../../../components/onboard/patient-form';

const Page = async ({ searchParams }: { searchParams: { role: string; userId: string } }) => {
  const role = searchParams.role;
  const userId = searchParams.userId;
  const response = await getSpecialties();
  const specialties = response?.data ?? [];
  return (
    <div className="text-white">
      {role === 'DOCTOR' && <DoctorForm userId={userId} specialties={specialties} />}
      {role === 'PATIENT' && <PatientForm userId={userId} />}
      {role === 'HOSPITAL' && <HospitalForm userId={userId} />}
    </div>
  );
};

export default Page;
