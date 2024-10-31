'use client';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/libs/shadcn-ui/components/resizable';
import { TooltipProvider } from '@/libs/shadcn-ui/components/tooltip';
import { cn } from '@/libs/shadcn-ui/utils/utils';
import { Label } from '@radix-ui/react-dropdown-menu';
import { User } from 'lucide-react';
import { useState } from 'react';
import { SidebarNav } from './side-bar-nav';

type ProfileLayoutProps = {
  defaultLayout?: number[] | undefined;
  navCollapsedSize?: number | undefined;
  defaultCollapsed?: boolean | undefined;
  children: React.ReactNode;
  role: string;
};

const ProfileLayout = ({
  defaultLayout = [20, 32, 48],
  navCollapsedSize = 4,
  defaultCollapsed = false,
  role,
  children,
}: ProfileLayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className="items-stretch h-full min-h-screen "
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(sizes)}`;
        }}
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={25}
          maxSize={30}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`;
          }}
          onResize={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`;
          }}
          className={cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')}
        >
          {!isCollapsed ? (
            <Label className="flex items-center gap-2 border-b mb-4 py-7 px-4 w-full h-10 text-lg font-bold bg-primary-500">
              <User />
              Cuenta
            </Label>
          ) : (
            <div className="flex items-center justify-center gap-2 border-b mb-4 py-7 px-4 w-full h-10 text-lg font-bold bg-primary-500">
              <User />
            </div>
          )}
          <SidebarNav role={role} isCollapsed={isCollapsed} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};

export default ProfileLayout;
