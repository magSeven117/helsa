'use client';

import { Button } from '@/libs/shadcn-ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/libs/shadcn-ui/components/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/libs/shadcn-ui/components/tooltip';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import type { ColumnDef, TableMeta } from '@tanstack/react-table';
import * as React from 'react';
import { EditTypeModal } from '../forms/edit-type-modal';

interface CustomTableMeta {
  remove: (id: string) => Promise<void>;
}

type ExtendedTableMeta = TableMeta<AppointmentType> & CustomTableMeta;

export type AppointmentType = {
  id: string;
  name: string;
  system: boolean;
  duration: number;
  color: string;
};

export const columns: ColumnDef<AppointmentType>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
    cell: ({ row }) => (
      <div className="flex space-x-2 items-center">
        <div className="size-3" style={{ backgroundColor: row.original.color }} />
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-default">{row.getValue('name')}</span>
            </TooltipTrigger>
            {row.original?.name && (
              <TooltipContent className="px-3 py-1.5 text-xs rounded-none" side="right" sideOffset={10}>
                {row.original.name}
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>

        {row.original.system && (
          <div className="pl-2">
            <span className="border border-border rounded-full py-1.5 px-3 text-xs text-[#878787] font-mono">
              System
            </span>
          </div>
        )}
      </div>
    ),
  },
  {
    header: 'Duration',
    accessorKey: 'duration',
    cell: ({ row }) =>
      row.getValue('duration')
        ? `${
            (row.getValue('duration') as number) >= 60
              ? `${Math.floor((row.getValue('duration') as number) / 60)}h ${
                  (row.getValue('duration') as number) % 60 > 0 ? `${(row.getValue('duration') as number) % 60}m` : ''
                }`
              : `${row.getValue('duration')}m`
          }`
        : '-',
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const [isOpen, setOpen] = React.useState(false);
      const [isDeleting, setDeleting] = React.useState(false);

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-none">
              <DropdownMenuItem className="rounded-none" onClick={() => setOpen(true)}>
                Edit
              </DropdownMenuItem>
              {!row.original.system && (
                <DropdownMenuItem
                  className="rounded-none"
                  onClick={async () => {
                    await (table.options.meta as ExtendedTableMeta).remove(row.id);
                  }}
                >
                  Remove
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <EditTypeModal id={row.id} defaultValue={row.original} isOpen={isOpen} onOpenChange={setOpen} />
        </div>
      );
    },
  },
];
