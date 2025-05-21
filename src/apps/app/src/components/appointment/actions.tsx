import { Button } from '@helsa/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@helsa/ui/components/dropdown-menu';
import { DollarSign, Edit, Ellipsis, Trash } from 'lucide-react';

const Actions = ({ status }: { status: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="" variant={'outline'} size={'icon'}>
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem asChild>
          <Button variant={'ghost'} className="w-full gap-2">
            <Edit className="size-4" />
            Re agendar
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button variant={'ghost'} className="w-full gap-2 text-red-500">
            <Trash className="size-4" />
            Cancelar
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button variant={'ghost'} className="w-full gap-2 text-green-500">
            <DollarSign className="size-4" />
            Pagar
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button variant={'ghost'} className="w-full gap-2">
            <Edit className="size-4" />
            Re agendar
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
