import { Table } from '@tanstack/react-table';
import { Checkbox } from '../checkbox';

interface DataTableIdHeaderProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>;
}

export const DataTableIdHeader = <TData,>({ table }: DataTableIdHeaderProps<TData>) => {
  return (
    <Checkbox
      checked={table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected()}
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
      className="translate-y-[2px] rounded-none"
    />
  );
};
