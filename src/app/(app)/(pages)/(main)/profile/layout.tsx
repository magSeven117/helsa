
import { currentUser } from '@clerk/nextjs/server';
import ProfileTabs from '../../../components/profile/profile-tabs/profile-tabs';

const Page = async ({ children }) => {
  const { fullName } = await currentUser();
  return (
    <div className="flex flex-col justify-start items-start w-full p-4">
      <h1 className="text-3xl font-bold mb-5">Dr. {fullName}</h1>
      <div>
        <ProfileTabs/>
        {children}
      </div>
    </div>
  );
};

export default Page;
