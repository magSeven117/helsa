import { getCurrentUser } from '@/app/(server)/actions/user/get-current-user';
import { redirect } from 'next/navigation';
import React from 'react';
import { NavigationProfile } from '../../../components/profile/navigation-profile';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const userResponse = await getCurrentUser();
  const user = userResponse?.data ?? null;
  if (!user) return redirect('/sign-in');
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
