import { Button } from '@/libs/shadcn-ui/components/button';
import { useSidebar } from '@/libs/shadcn-ui/components/sidebar';
import { cn } from '@/libs/shadcn-ui/utils/utils';
import { Menu } from 'lucide-react';

export function CustomTrigger() {
  const { toggleSidebar, state } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn('rounded-full bg-white w-10 h-10')}
      onClick={(event) => {
        toggleSidebar()
      }}
    >
      <Menu />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}
