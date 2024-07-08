
import { currentUser } from '@clerk/nextjs/server';
import ProfileTabs from '../../../components/sections/profile-tabs/profile-tabs';

const Page = async ({ children }) => {
  const { publicMetadata, fullName } = await currentUser();
  return (
    <div className="flex flex-col justify-start items-start w-full p-4">
      <h1 className="text-3xl font-bold mb-5">{ publicMetadata.role === 'DOCTOR' ? `Dr. ${fullName}` : fullName}</h1>
      <div className='w-[70%]'>
        <ProfileTabs role={publicMetadata.role as string || 'PATIENT'}/>
        {children}
      </div>
    </div>
  );
};

export default Page;
