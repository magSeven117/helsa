'use client';

import { updateColumnVisibilityAction } from '@/src/actions/appointment/update-column-visibility-action';
import { useAppointmentStore } from '@/src/store/appointments-store';
import { Meta } from '@helsa/ddd/core/collection.';
import { Table, TableBody, TableCell, TableRow } from '@helsa/ui/components/table';
import { cn } from '@helsa/ui/lib/utils';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable, type VisibilityState } from '@tanstack/react-table';
import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';
import AppointmentDetailsSheet from '../details';
import { AppointmentsTableHeader } from './header';
import { AppointmentPagination } from './pagination';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  hasNextPage?: boolean;
  hasFilters?: boolean;
  pageSize?: number;
  meta: Meta;
  initialColumnVisibility: VisibilityState;
}
export function DataTable<TData, TValue>({
  columns,
  data: initialData,
  meta: pageMeta,
  hasFilters,
  initialColumnVisibility,
}: DataTableProps<TData, TValue>) {
  const [data, setData] = useState(initialData);
  const { setColumns, rowSelection, setRowSelection } = useAppointmentStore();
  const [appointmentId, setAppointmentId] = useQueryState('id');
  const selectedRows = Object.keys(rowSelection).length;
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(initialColumnVisibility ?? {});

  const setOpen = (id: string | boolean) => {
    if (id) {
      setAppointmentId(id as string);
    } else {
      setAppointmentId(null);
    }
  };

  const table = useReactTable({
    getRowId: (row: any) => row.id,
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    meta: {
      setOpen,
    },
    state: {
      rowSelection,
      columnVisibility,
    },
  });

  const selectedAppointment = data.find((row: any) => row.id === appointmentId);

  useEffect(() => {
    setColumns(table.getAllLeafColumns());
  }, [columnVisibility]);

  useEffect(() => {
    updateColumnVisibilityAction({
      key: 'appointment-column-visibility',
      data: columnVisibility,
    });
  }, [columnVisibility]);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return (
    <div className="mb-8 relative w-full">
      <Table className="border">
        <AppointmentsTableHeader table={table} />
        <TableBody className="w-full">
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="h-[40px] md:h-[45px] cursor-pointer select-text">
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      'px-3 md:px-4 py-2 border',
                      (cell.column.id === 'select' ||
                        cell.column.id === 'date' ||
                        cell.column.id === 'doctor' ||
                        cell.column.id === 'status' ||
                        cell.column.id === 'type') &&
                        'hidden md:table-cell',
                    )}
                    onClick={() => {
                      if (cell.column.id !== 'select' && cell.column.id !== 'actions') {
                        setOpen(row.id);
                      }
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <AppointmentPagination meta={pageMeta} />
      <AppointmentDetailsSheet data={selectedAppointment as any} isOpen={Boolean(appointmentId)} setOpen={setOpen} />
    </div>
  );
}
