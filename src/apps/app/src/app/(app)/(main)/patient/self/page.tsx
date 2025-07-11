import HeaderPatient from '@/src/components/patient/details/header';
import PatientDetailsTabs from '@/src/components/patient/details/tabs';

const Page = async () => {
  return (
    <div className="py-6 px-4 w-full">
      <HeaderPatient />
      <PatientDetailsTabs />
    </div>
  );
};

export default Page;
