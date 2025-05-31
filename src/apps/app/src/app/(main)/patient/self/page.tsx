import HeaderPatient from '@/src/modules/patient/components/details/header';
import PatientDetailsTabs from '@/src/modules/patient/components/details/tabs';

const Page = async () => {
  return (
    <div className="py-6 px-4 w-full">
      <HeaderPatient />
      <PatientDetailsTabs />
    </div>
  );
};

export default Page;
