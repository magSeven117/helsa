'use client';

import { Button } from '@/libs/shadcn-ui/components/button';
import { Input } from '@/libs/shadcn-ui/components/input';
import type { Table } from '@tanstack/react-table';
import type { AppointmentType } from './columns';

type Props = {
  table?: Table<AppointmentType>;
  onOpenChange?: (isOpen: boolean) => void;
};

export function Header({ table, onOpenChange }: Props) {
  return (
    <div className="flex items-center py-4 justify-between">
      <Input
        placeholder="Search..."
        value={(table?.getColumn('name')?.getFilterValue() as string) ?? ''}
        onChange={(event) => table?.getColumn('name')?.setFilterValue(event.target.value)}
        className="max-w-sm rounded-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />

      <Button className="" onClick={() => onOpenChange?.(true)}>
        Crear tipo de consulta
      </Button>
    </div>
  );
}
