import PatientProfileIndex from '@/src/components/profile/patient-sections';

const Page = () => {
  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col w-full gap-10">
        <PatientProfileIndex />
      </div>
    </div>
  );
};

export default Page;
