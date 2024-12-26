'use client';

import { Table } from '@tanstack/react-table';
import * as React from 'react';
import { Input } from '../input';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchColumn: string;
}

export function DataTableSearcher<TData>({ table, searchColumn }: DataTableToolbarProps<TData>) {
  return (
    <Input
      placeholder="Filter tasks..."
      value={(table.getColumn(searchColumn || 'name')?.getFilterValue() as string) ?? ''}
      onChange={(event) => table.getColumn(searchColumn || 'name')?.setFilterValue(event.target.value)}
      className="h-8 w-[150px] lg:w-[250px] rounded-none focus-visible:ring-transparent"
    />
  );
}
