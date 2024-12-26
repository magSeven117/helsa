import { Table } from '@tanstack/react-table';
import { LucideIcon } from 'lucide-react';
import * as React from 'react';
import { DataTableFacetedFilter } from './data-table-faceted-filter';

interface DataTableTagFilterProps<TData> {
  table: Table<TData>;
  columnFilterTagName: string;
  columnTags: { value: string; label: string; icon: LucideIcon }[];
  title: string;
}
export function DataTableTagFilter<TData>({
  table,
  columnFilterTagName,
  columnTags,
  title,
}: DataTableTagFilterProps<TData>) {
  if (!table.getColumn(columnFilterTagName)) {
    return null;
  }
  return <DataTableFacetedFilter column={table.getColumn(columnFilterTagName)} title={title} options={columnTags} />;
}

export default DataTableTagFilter;
