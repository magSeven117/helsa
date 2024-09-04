import { Activity } from 'lucide-react';
import banner from '../../../../../public/images/banner2-removebg.png';
import styles from './auth.module.css';
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.auth_layout}>
      <div className='flex flex-col h-full justify-center items-center gap-10'>
        <div className='flex justify-center gap-2 mt-2 items-center'>
          <Activity className='text-color-foreground-primary overflow-hidden' />
          <h1 className='text-3xl font-semibold'>Helsa</h1>
        </div>
        <div className='w-full'>{children}</div>
      </div>
      <div className={styles.auth_layout__right}>
        <div className={styles.auth_layout__banner}>
          <img
            src={banner.src}
            alt="banner"
            className={styles.auth_layout__image}
          ></img>
          
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
