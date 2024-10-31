import ProfileLayout from '@/app/(app)/components/profile/profile-layout';

import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Helsa | Perfil',
  description: 'Actualiza tus datos personales, preferencias de notificación y más.',
};

const sidebarNavItems = [
  
];

const Layout = ({ children }) => {
  return (
    <div className="space-y-6  w-full h-full">
      <div className="flex flex-col space-y-8 lg:flex-row  lg:space-y-0 h-full md:w-2/3">
        <ProfileLayout role='DOCTOR'>{children}</ProfileLayout>
      </div>
    </div>
  );
};

export default Layout;
