import { getProfile } from '@/src/modules/auth/actions/get-profile-info-action';
import ModalAssistant from '@/src/modules/assistant/components/modal-assistant';
import { SessionProvider } from '@/src/modules/auth/components/session-provider';
import SideBar from '@/src/modules/shared/components/side-bar/side-bar';
import TopBar from '@/src/modules/shared/components/top-bar/top-bar';
import { SidebarProvider } from '@helsa/ui/components/sidebar';
import React, { Suspense } from 'react';
import Loading from './loading';
import { ChatFloatingButton } from '@/src/modules/assistant/components/floting-button';
import { AnimateProvider } from '@/src/modules/chat/components/animate';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { profile, user } = await getProfile();

  return (
    <div className="flex justify-start items-start h-full w-full styled-scroll">
      <SessionProvider user={user} profile={profile}>
        <SidebarProvider>
          <SideBar />
          <div className="flex flex-col items-start w-full styled-scroll  overflow-y-scroll pb-8  bg-background relative">
            <TopBar />
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <AnimateProvider>
              <ChatFloatingButton />
            </AnimateProvider>
          </div>
          <ModalAssistant />
        </SidebarProvider>
      </SessionProvider>
    </div>
  );
};

export default Layout;
