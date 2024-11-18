import { getCurrentUser } from '@/modules/user/presentation/actions/get-current-user';
import { NavigationProfile } from './components/navigation-profile';

const Layout = async ({ children }) => {
  const user = await getCurrentUser();
  return (
    <div className="w-full h-full pt-10">
      <div className="space-y-6 px-9  w-full h-full">
        <NavigationProfile role={user.role} />
        <div className="flex flex-col space-y-8 lg:flex-row  lg:space-y-0 h-full md:w-1/2">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
