import { Activity } from 'lucide-react';
import banner from '../../../../../public/images/banner2-removebg.png';
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='grid grid-cols-1 box-border h-full w-full lg:grid-cols-2'>
      <div className='flex flex-col h-full justify-center items-center gap-10'>
        <div className='flex justify-center gap-2 mt-2 items-center'>
          <Activity className='text-color-foreground-primary overflow-hidden' />
          <h1 className='text-3xl font-semibold'>Helsa</h1>
        </div>
        <div className='w-full'>{children}</div>
      </div>
      <div className='overflow-hidden hidden flex-row box-border w-full lg:flex'>
        <div className='hidden bg-primary w-full h-full justify-center items-center lg:flex'>
          <img
            src={banner.src}
            alt="banner"
            className='h-full object-contain'
          ></img>
          
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
