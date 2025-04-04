import { getCurrentUser } from '@/src/actions/user/get-current-user';
import ModalAssistant from '@/src/components/assistant/modal-assistant';
import { SessionProvider } from '@/src/components/auth/session-provider';
import SideBar from '@/src/components/side-bar/side-bar';
import TopBar from '@/src/components/top-bar/top-bar';
import { SidebarProvider } from '@helsa/ui/components/sidebar';
import React, { Suspense } from 'react';
import Loading from './loading';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const userResponse = await getCurrentUser();
  const user = userResponse?.data!;

  return (
    <div className="flex justify-start items-start h-full w-full styled-scroll ">
      <SessionProvider user={user}>
        <SidebarProvider>
          <SideBar />
          <div className="flex flex-col items-start w-full styled-scroll  overflow-y-scroll pb-8  bg-background">
            <TopBar />
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </div>
          <ModalAssistant />
        </SidebarProvider>
      </SessionProvider>
    </div>
  );
};

export default Layout;
