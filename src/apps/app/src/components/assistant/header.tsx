import { useAssistantStore } from '@/src/store/assistant-store';
import { Button } from '@helsa/ui/components/button';
import { cn } from '@helsa/ui/lib/utils';
import { Sidebar, X } from 'lucide-react';

type Props = {
  isExpanded: boolean;
  toggleSidebar: () => void;
};

export function Header({ toggleSidebar, isExpanded }: Props) {
  const { setOpen } = useAssistantStore();

  return (
    <div className="px-4 py-3 flex justify-between items-center border-border border-b-[1px]">
      <div className="flex items-center space-x-3">
        <Button variant="outline" size="icon" className="size-8  p-0" onClick={toggleSidebar}>
          <Sidebar width={18} />
        </Button>

        <h2>TopMédicosIntegrales</h2>
      </div>

      <Button className="flex md:hidden" size="icon" variant="ghost" onClick={() => setOpen()}>
        <X />
      </Button>

      <div className="space-x-2 items-center hidden md:flex">
        <Experimental className="border-border text-[#878787]" />
      </div>
    </div>
  );
}

function Experimental({ className }: { className: string }) {
  return (
    <span
      className={cn(
        'flex items-center py-[3px] px-3 rounded-full border border-primary text-[10px] h-full font-normal',
        className,
      )}
    >
      Experimental
    </span>
  );
}
