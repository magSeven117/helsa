import { getProfile } from '@/src/actions/get-profile-info-action';
import { ChatFloatingButton } from '@/src/components/assistant/floating-button';
import ModalAssistant from '@/src/components/assistant/modal-assistant';
import { SessionProvider } from '@/src/components/auth/session-provider';
import { AnimateProvider } from '@/src/components/chat/animate';
import SideBar from '@/src/components/shared/side-bar/side-bar';
import TopBar from '@/src/components/shared/top-bar/top-bar';
import { Primitives } from '@helsa/ddd/types/primitives';
import { User } from '@helsa/engine/user/domain/user';
import { SidebarProvider } from '@helsa/ui/components/sidebar';
import React, { Suspense } from 'react';
import Loading from './loading';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { profile, user } = await getProfile();

  return (
    <div className="flex justify-start items-start h-full w-full styled-scroll">
      <SessionProvider user={user as Primitives<User>} profile={profile}>
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
