'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './styles.module.css';

const ProfileTabs = () => {
  const pathName = usePathname();
  return (
    <div className={styles.tab_container}>
      <div className={styles.tab_list}>
        <Link href={'/profile/personal-data'} className={styles.tab_list_item + ` ${pathName.includes('/profile/personal-data') ? styles.active : ''}`}>
          Personal Data
        </Link>
        <Link href={'/profile/profesional-data'} className={styles.tab_list_item + ` ${pathName.includes('/profile/profesional-data') ? styles.active : ''}`}>
          Professional Data
        </Link>
      </div>
    </div>
  );
};

export default ProfileTabs;
