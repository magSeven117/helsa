'use client';
import { Button } from '@/libs/shadcn-ui/components/button';
import { DataTable } from '@/libs/shadcn-ui/components/data-table/data-table';
import { DataTableButtonReset } from '@/libs/shadcn-ui/components/data-table/data-table-button-reset';
import { DataTableColumnHeader } from '@/libs/shadcn-ui/components/data-table/data-table-column-header';
import { DataTableIdColumn } from '@/libs/shadcn-ui/components/data-table/data-table-id-column';
import { DataTableIdHeader } from '@/libs/shadcn-ui/components/data-table/data-table-id-header';
import { DataTablePagination } from '@/libs/shadcn-ui/components/data-table/data-table-pagination';
import { DataTableSearcher } from '@/libs/shadcn-ui/components/data-table/data-table-searcher';
import DataTableTagFilter from '@/libs/shadcn-ui/components/data-table/data-table-tag-filter';
import { DataTableViewOptions } from '@/libs/shadcn-ui/components/data-table/data-table-view-options';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/libs/shadcn-ui/components/dropdown-menu';
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { AlertCircle, EyeIcon, MoreHorizontal, PencilIcon } from 'lucide-react';
import { useState } from 'react';

type Patient = {
  id: string;
  name: string;
  type: string;
  age: number;
  lastVisit: string;
};
const patientsColumns: ColumnDef<Patient>[] = [
  {
    id: 'select',
    header: ({ table }) => <DataTableIdHeader table={table} />,
    cell: ({ row }) => <DataTableIdColumn row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre" />,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'age',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Edad" />,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tipo" />,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'lastVisit',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ultima Visita" />,
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 rounded-none">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-none">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const statuses = [
  {
    value: 'Consulta',
    label: 'Consulta',
    icon: PencilIcon,
  },
  {
    value: 'Revision',
    label: 'Revision',
    icon: EyeIcon,
  },
  {
    value: 'Emergencia',
    label: 'Emergencia',
    icon: AlertCircle,
  },
];

const data = [
  {
    id: '1',
    name: 'Juan Perez',
    age: 23,
    lastVisit: '2022-01-01',
    type: 'Revision',
  },
  {
    id: '2',
    name: 'Maria Perez',
    age: 30,
    lastVisit: '2022-01-01',
    type: 'Consulta',
  },
  {
    id: '3',
    name: 'Jose Perez',
    age: 45,
    lastVisit: '2022-01-01',
    type: 'Revision',
  },
  {
    id: '4',
    name: 'Luis Perez',
    age: 60,
    lastVisit: '2022-01-01',
    type: 'Consulta',
  },
  {
    id: '5',
    name: 'Ana Perez',
    age: 70,
    lastVisit: '2022-01-01',
    type: 'Revision',
  },
];

const PatientsTable = () => {
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns: patientsColumns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
  return (
    <div className="space-y-4 rounded-none border p-4">
      <div className="flex flex-col gap-1 mb-4">
        <p className="text-lg font-semibold">Pacientes</p>
        <p className="text-sm text-muted-foreground">Aquí puedes ver el historial de citas de tus pacientes</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-1 items-center space-x-2">
          <DataTableSearcher searchColumn="name" table={table} />
          <DataTableTagFilter table={table} columnFilterTagName="type" columnTags={statuses} title="Tipo" />
          <DataTableButtonReset table={table} />
        </div>
        <DataTableViewOptions table={table} />
      </div>
      <div className="rounded-none border">
        <DataTable table={table} />
      </div>
      <DataTablePagination table={table} />
    </div>
  );
};

export default PatientsTable;
