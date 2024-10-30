import DoctorForm from "@/app/(app)/components/onboarding/doctor-form";

const Page = ({ searchParams }) => {
  const role = searchParams.role;
  const userId = searchParams.userId;
  return (
    <div className="text-white">
      {
        role === 'DOCTOR' && (<DoctorForm userId={userId}/>)
      }
    </div>
  );
}

export default Page;
