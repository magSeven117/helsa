import { getCurrentUser } from '@/src/actions/user/get-current-user';
import { NavigationProfile } from '@/src/components/profile/navigation-profile';
import { redirect } from 'next/navigation';
import React from 'react';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const userResponse = await getCurrentUser();
  const user = userResponse?.data ?? null;
  if (!user) return redirect('/sign-in');
  return (
    <div className="w-full pt-10">
      <div className="space-y-6 px-9  w-full">
        <NavigationProfile role={user.role} />
        <div className="flex flex-col space-y-8 lg:flex-row  lg:space-y-0 md:w-1/2">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
