import DoctorForm from '../components/doctor-form';
import HospitalForm from '../components/hospital-form';
import PatientForm from '../components/patient-form';

const Page = ({ searchParams }) => {
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
