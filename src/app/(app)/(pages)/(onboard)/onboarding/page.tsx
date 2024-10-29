import DoctorForm from "@/app/(app)/components/onboarding/doctor-form";

const Page = ({ searchParams }) => {
  const role = searchParams.role;
  return (
    <div className="text-white">
      {
        role === 'DOCTOR' && (<DoctorForm/>)
      }
    </div>
  );
}

export default Page;
