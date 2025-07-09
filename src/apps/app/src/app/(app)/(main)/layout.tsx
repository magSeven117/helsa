import { SessionProvider } from '@/src/app/(app)/(main)/_components/session-provider';
import { getProfile } from '@/src/app/(server)/actions/get-profile-info-action';
import { ChatFloatingButton } from '@/src/modules/assistant/components/floting-button';
import ModalAssistant from '@/src/modules/assistant/components/modal-assistant';
import { AnimateProvider } from '@/src/modules/chat/components/animate';
import SideBar from '@/src/modules/shared/components/side-bar/side-bar';
import TopBar from '@/src/modules/shared/components/top-bar/top-bar';
import { Primitives } from '@helsa/ddd/types/primitives';
import { User } from '@helsa/engine/user/domain/user';
import { SidebarProvider } from '@helsa/ui/components/sidebar';
import React, { Suspense } from 'react';
import Loading from './loading';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { profile, user } = await getProfile();

  return (
    <div className="flex justify-start items-start h-full w-full styled-scroll">
      <SessionProvider user={User.fromPrimitives(user as Primitives<User>)} profile={profile}>
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
