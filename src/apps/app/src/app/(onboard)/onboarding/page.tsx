import { getSpecialties } from '@/src/actions/doctor/get-specialties';
import DoctorForm from '@/src/components/onboard/doctor-form';
import HospitalForm from '@/src/components/onboard/hospital-form';
import PatientForm from '@/src/components/onboard/patient-form';

const Page = async (props: { searchParams: Promise<{ role: string; userId: string }> }) => {
  const searchParams = await props.searchParams;
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
