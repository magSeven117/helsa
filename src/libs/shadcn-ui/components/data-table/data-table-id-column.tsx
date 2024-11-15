import { Row } from '@tanstack/react-table';
import { Checkbox } from '../checkbox';

interface DataTableIdColumnProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  row: Row<TData>;
}

export const DataTableIdColumn = <TData,>({ row }: DataTableIdColumnProps<TData>) => {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
      className="translate-y-[2px] rounded-none"
    />
  );
};
