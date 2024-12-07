'use client';

import { useAppointmentStore } from '@/app/(client)/store/appointments-store';
import { Button } from '@/libs/shadcn-ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/libs/shadcn-ui/components/dropdown-menu';
import { Ban, ChevronDown } from 'lucide-react';

const AppointmentActions = () => {
  const { setRowSelection, rowSelection } = useAppointmentStore();
  const transactionIds = Object.keys(rowSelection);
  if (transactionIds.length === 0) {
    return null;
  }
  return (
    <div className="ml-auto">
      <div className="flex items-center">
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="space-x-2 rounded-none h-9">
                <span>Actions</span>
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px] rounded-none" sideOffset={8}>
              <DropdownMenuGroup>
                <DropdownMenuItem className="rounded-none gap-3" onClick={() => setRowSelection({})}>
                  <Ban className="size-4" />
                  <span>Cancelar</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default AppointmentActions;
