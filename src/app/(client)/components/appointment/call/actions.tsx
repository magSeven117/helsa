import { Button } from '@/libs/shadcn-ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/libs/shadcn-ui/components/dropdown-menu';
import { Ambulance, BookmarkCheck, Calendar, PlusCircle } from 'lucide-react';

const Actions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={'outline'} className="gap-2">
          Actions
          <PlusCircle />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-none" align="end">
        <DropdownMenuItem className="rounded-none gap-2">
          <Calendar className="size-4" />
          Re agendar
        </DropdownMenuItem>
        <DropdownMenuItem className="rounded-none gap-2">
          <BookmarkCheck className="size-4" />
          Finalizar
        </DropdownMenuItem>
        <DropdownMenuItem className="rounded-none gap-2">
          <Ambulance className="size-4" />
          Remitir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
