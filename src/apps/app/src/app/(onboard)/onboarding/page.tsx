import DoctorForm from '@/src/components/onboard/doctor-form';
import HospitalForm from '@/src/components/onboard/hospital-form';
import PatientForm from '@/src/components/onboard/patient-form';

const Page = async (props: { searchParams: Promise<{ role: string; userId: string }> }) => {
  const searchParams = await props.searchParams;
  const role = searchParams.role;
  const userId = searchParams.userId;
  return (
    <div className="text-white">
      {role === 'DOCTOR' && <DoctorForm userId={userId} />}
      {role === 'PATIENT' && <PatientForm userId={userId} />}
      {role === 'HOSPITAL' && <HospitalForm userId={userId} />}
    </div>
  );
};

export default Page;
