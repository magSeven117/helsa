import { HospitalProfileIndex } from '@/src/components/profile/hospital-sections';

const Page = async () => {
  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col w-full gap-10">
        <HospitalProfileIndex />
      </div>
    </div>
  );
};

export default Page;
