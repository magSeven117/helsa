import DoctorProfile from '@/app/(app)/components/sections/doctor-profile';
import { currentUser } from '@clerk/nextjs/server';

const Page = async () => {
  const user = await currentUser();
  console.log(user.unsafeMetadata);
  if(user.publicMetadata?.role === 'DOCTOR' || user.unsafeMetadata.role === 'DOCTOR'){
    return <DoctorProfile user={user}/>
  }
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <h1>
        Work in progress
      </h1>
    </div>
  ) 
};

export default Page;
