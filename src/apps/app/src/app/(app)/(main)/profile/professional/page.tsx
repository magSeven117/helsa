import DoctorProfileIndex from '@/src/modules/profile/components/doctor-sections';

const Page = () => {
  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col w-full gap-10">
        <DoctorProfileIndex />
      </div>
    </div>
  );
};

export default Page;
