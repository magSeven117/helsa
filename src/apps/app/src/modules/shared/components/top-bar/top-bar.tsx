'use client';

import { SidebarTrigger } from '../side-bar/sidabar-trigger';

const TopBar = () => {
  return (
    <div className="flex w-full justify-between items-center pl-8  pr-8 py-5 md:hidden">
      <div className="flex w-1/2 items-center gap-5">
        <div className="justify-center items-center hidden max-sm:flex">
          <SidebarTrigger />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
