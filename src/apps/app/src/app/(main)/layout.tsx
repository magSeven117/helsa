import { getCurrentUser } from '@/src/actions/user/get-current-user';
import ModalAssistant from '@/src/components/assistant/modal-assistant';
import { ChatAIProvider } from '@/src/components/chat/chat-ai-provider';
import KBar from '@/src/components/kbar';
import SessionUser from '@/src/components/session-user';
import SideBar from '@/src/components/side-bar/side-bar';
import TopBar from '@/src/components/top-bar/top-bar';
import { SidebarProvider } from '@helsa/ui/components/sidebar';
import React, { Suspense } from 'react';
import { v4 } from 'uuid';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const userResponse = await getCurrentUser();
  const user = userResponse?.data!;

  return (
    <div className="flex justify-start items-start w-full styled-scroll">
      <SessionUser userProvide={user} />
      <ChatAIProvider
        initialAIState={{
          user: {
            id: user.id,
            name: user.name,
            image: user.image || '',
          },
          messages: [],
          chatId: v4(),
        }}
      >
        <SidebarProvider>
          <SideBar user={user} />
          <KBar>
            <div className="flex flex-col items-start w-full styled-scroll">
              <TopBar />
              <Suspense>{children}</Suspense>
            </div>
          </KBar>
          <ModalAssistant />
        </SidebarProvider>
      </ChatAIProvider>
    </div>
  );
};

export default Layout;
