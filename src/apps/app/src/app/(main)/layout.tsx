import { getCurrentUser } from '@/src/actions/user/get-current-user';
import ModalAssistant from '@/src/components/assistant/modal-assistant';
import SessionUser from '@/src/components/session-user';
import SideBar from '@/src/components/side-bar/side-bar';
import TopBar from '@/src/components/top-bar/top-bar';
import { SidebarProvider } from '@helsa/ui/components/sidebar';
import React, { Suspense } from 'react';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const userResponse = await getCurrentUser();
  const user = userResponse?.data!;

  return (
    <div className="flex justify-start items-start h-full w-full styled-scroll ">
      <SessionUser userProvide={user} />
      <SidebarProvider>
        <SideBar user={user} />
        <div className="flex flex-col items-start w-full styled-scroll  overflow-y-scroll pb-8  bg-background">
          <TopBar />
          <Suspense>{children}</Suspense>
        </div>
        <ModalAssistant />
      </SidebarProvider>
    </div>
  );
};

export default Layout;
