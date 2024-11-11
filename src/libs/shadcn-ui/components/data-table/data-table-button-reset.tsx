import { Cross2Icon } from '@radix-ui/react-icons';

import { Table } from '@tanstack/react-table';
import { Button } from '../button';

interface DataTableButtonResetProps<TData> {
  table: Table<TData>;
}

export function DataTableButtonReset<TData>({ table }: DataTableButtonResetProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  if (!isFiltered) return null;

  return (
    <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3 rounded-none">
      Reset
      <Cross2Icon className="ml-2 h-4 w-4" />
    </Button>
  );
}
