import { SidebarProvider } from '@/libs/shadcn-ui/components/sidebar';
import { getCurrentUser } from '@/modules/user/presentation/actions/get-current-user';
import { redirect } from 'next/navigation';
import React from 'react';
import ModalAssistant from './components/assistant/modal-assistant';
import KBar from './components/kbar';
import SideBar from './components/side-bar/side-bar';
import TopBar from './components/top-bar/top-bar';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();
  if (!user) {
    return redirect('/sign-in');
  } else if (user.role === 'UNDEFINED') {
    return redirect(`/select-role?userId=${user.id}`);
  }
  return (
    <div className="flex justify-start items-start w-full styled-scroll">
      <SidebarProvider>
        <SideBar role={user.role as string} />
        <KBar>
          <div className="flex flex-col items-start w-full styled-scroll">
            <TopBar />
            {children}
          </div>
        </KBar>
        <ModalAssistant />
      </SidebarProvider>
    </div>
  );
};

export default Layout;
