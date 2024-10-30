import DoctorForm from "@/app/(app)/components/onboarding/doctor-form";
import HospitalForm from "@/app/(app)/components/onboarding/hospital-form";
import PatientForm from "@/app/(app)/components/onboarding/patient-form";

const Page = ({ searchParams }) => {
  const role = searchParams.role;
  const userId = searchParams.userId;
  return (
    <div className="text-white">
      {
        role === 'DOCTOR' && (<DoctorForm userId={userId}/>)
      }
      {
        role === 'PATIENT' && (<PatientForm userId={userId}/>)
      }
      {
        role === 'HOSPITAL' && (<HospitalForm userId={userId}/>)
      }
    </div>
  );
}

export default Page;
