'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/libs/shadcn-ui/components/alert-dialog';
import { Dialog } from '@/libs/shadcn-ui/components/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/libs/shadcn-ui/components/table';
import { cn } from '@/libs/shadcn-ui/utils/utils';
import { flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';
import CreateTypeModal from '../forms/create-type-modal';
import { type AppointmentType, columns } from './columns';
import { Header } from './header';

type Props = {
  data: AppointmentType[];
};

export function DataTable({ data }: Props) {
  const [isOpen, onOpenChange] = React.useState(false);

  // const deleteCategories = useAction(deleteCategoriesAction, {
  //   onSuccess: ({ data }) => {
  //     toast.success((data as any).message);
  //   },
  // });

  const table = useReactTable({
    data,
    getRowId: ({ id }) => id,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    meta: {
      //deleteCategories,
    },
  });

  return (
    <AlertDialog>
      <div className="w-full">
        <Header table={table} onOpenChange={onOpenChange} />

        <Table className="border">
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow className="hover:bg-transparent" key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell key={cell.id} className={cn(index === 2 && 'w-[50px]')}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <CreateTypeModal onOpenChange={onOpenChange} isOpen={isOpen} />
        </Dialog>
      </div>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Estas seguro que deseas eliminar las categorías seleccionadas?</AlertDialogTitle>
          <AlertDialogDescription>
            Al eliminar una categoría, todos los productos relacionados con esta categoría serán eliminadas
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => {}}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
