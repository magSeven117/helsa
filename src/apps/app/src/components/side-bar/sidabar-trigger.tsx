import { Button } from '@helsa/ui/components/button';
import { useSidebar } from '@helsa/ui/components/sidebar';
import { cn } from '@helsa/ui/lib/utils';
import { ChevronLeft, ChevronRight, Sidebar } from 'lucide-react';

export function CustomTrigger() {
  const { toggleSidebar, state } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn('rounded-full bg-sidebar-accent w-5 h-5 border border-sidebar-border')}
      onClick={(event) => {
        toggleSidebar();
      }}
    >
      {state === 'expanded' ? <ChevronLeft className="size-4" /> : <ChevronRight />}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

export function SidebarTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn('w-10 h-10 p-4')}
      onClick={(event) => {
        toggleSidebar();
      }}
    >
      <Sidebar className="size-4 dark:text-white" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}
