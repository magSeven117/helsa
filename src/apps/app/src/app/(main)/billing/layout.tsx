import { NavigationBilling } from '@/src/modules/billing/components/navigation';
import React from 'react';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full pt-10">
      <div className="space-y-6 px-9  w-full h-full">
        <NavigationBilling />
        <div className="flex flex-col space-y-8 lg:flex-row  lg:space-y-0 h-full md:w-1/2">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
