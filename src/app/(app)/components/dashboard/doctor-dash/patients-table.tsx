'use client'
import { Button } from '@/libs/shadcn-ui/components/button';
import { Checkbox } from '@/libs/shadcn-ui/components/checkbox';
import { DataTable } from '@/libs/shadcn-ui/components/data-table/data-table';
import { DataTableColumnHeader } from '@/libs/shadcn-ui/components/data-table/data-table-column-header';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/libs/shadcn-ui/components/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

type Patient = {
  id: string;
  name: string;
  type: string;
  age: number;
  lastVisit: string;
};
const patientsColumns: ColumnDef<Patient>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected())
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px] rounded-none"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px] rounded-none"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'age',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Edad" />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo" />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'lastVisit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ultima Visita" />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 rounded-none">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className='rounded-none'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
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
  return <DataTable columns={patientsColumns} data={data} />;
};

export default PatientsTable;
