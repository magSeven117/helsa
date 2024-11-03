import { NavigationProfile } from '@/app/(app)/components/profile/navigation-profile';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Helsa | Perfil',
  description: 'Actualiza tus datos personales, preferencias de notificación y más.',
};

const Layout = ({ children }) => {
  return (
    <div className="space-y-6 px-9  w-full h-full">
      <NavigationProfile role="DOCTOR" />
      <div className="flex flex-col space-y-8 lg:flex-row  lg:space-y-0 h-full md:w-1/2">{children}</div>
    </div>
  );
};

export default Layout;
