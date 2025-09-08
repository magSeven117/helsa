'use client';
import { Button } from '@helsa/ui/components/button';
import { DataTable } from '@helsa/ui/components/data-table/data-table';
import { DataTableButtonReset } from '@helsa/ui/components/data-table/data-table-button-reset';
import { DataTableColumnHeader } from '@helsa/ui/components/data-table/data-table-column-header';
import { DataTableIdColumn } from '@helsa/ui/components/data-table/data-table-id-column';
import { DataTableIdHeader } from '@helsa/ui/components/data-table/data-table-id-header';
import { DataTablePagination } from '@helsa/ui/components/data-table/data-table-pagination';
import { DataTableSearcher } from '@helsa/ui/components/data-table/data-table-searcher';
import { DataTableViewOptions } from '@helsa/ui/components/data-table/data-table-view-options';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@helsa/ui/components/dropdown-menu';
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
import { useState, useEffect } from 'react';
import { useSession } from '@/src/components/auth/session-provider';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

type Patient = {
  id: string;
  userId: string;
  name: string;
  email: string;
  age?: number;
  lastVisit?: string;
  totalAppointments: number;
  lastAppointmentStatus?: string;
  demographic: {
    civilStatus: string;
    occupation: string;
    educativeLevel: string;
  };
  biometric: {
    height: number;
    bloodType: string;
    organDonor: string;
  };
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
    accessorKey: 'totalAppointments',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total Citas" />,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'lastVisit',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Última Visita" />,
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      const lastVisit = row.getValue('lastVisit') as string;
      if (!lastVisit) return 'N/A';
      return format(new Date(lastVisit), 'dd/MM/yyyy', { locale: es });
    },
  },
  {
    accessorKey: 'lastAppointmentStatus',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Estado" />,
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      const status = row.getValue('lastAppointmentStatus') as string;
      if (!status) return 'N/A';
      return getStatusBadge(status);
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const patient = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 rounded-none">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-none">
            <DropdownMenuItem onClick={() => window.open(`/patient/${patient.id}`, '_blank')}>
              Ver historial médico
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Agendar cita</DropdownMenuItem>
            <DropdownMenuItem>Ver detalles</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Función para obtener el badge de estado
const getStatusBadge = (status: string) => {
  const statusConfig = {
    SCHEDULED: { label: 'Programada', className: 'bg-blue-100 text-blue-800' },
    CONFIRMED: { label: 'Confirmada', className: 'bg-green-100 text-green-800' },
    PAYED: { label: 'Pagada', className: 'bg-purple-100 text-purple-800' },
    READY: { label: 'Lista', className: 'bg-yellow-100 text-yellow-800' },
    STARTED: { label: 'En curso', className: 'bg-orange-100 text-orange-800' },
    FINISHED: { label: 'Finalizada', className: 'bg-gray-100 text-gray-800' },
    CANCELLED: { label: 'Cancelada', className: 'bg-red-100 text-red-800' },
    MISSED_BY_PATIENT: { label: 'Perdida (Paciente)', className: 'bg-red-100 text-red-800' },
    MISSED_BY_DOCTOR: { label: 'Perdida (Doctor)', className: 'bg-red-100 text-red-800' },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || { 
    label: status, 
    className: 'bg-gray-100 text-gray-800' 
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
};

const PatientsTable = () => {
  const { serializedUser: user } = useSession();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = useState<SortingState>([]);

  // Función para obtener pacientes del doctor
  const fetchPatients = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      const response = await fetch(`/api/v1/doctor/${user.id}/patients`);
      if (response.ok) {
        const result = await response.json();
        setPatients(result.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [user?.id]);

  const table = useReactTable({
    data: patients,
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
  if (loading) {
    return (
      <div className="space-y-4 border bg-background rounded-md p-4">
        <div className="flex flex-col gap-1 mb-4">
          <p className="text-lg font-semibold">Pacientes</p>
          <p className="text-sm text-muted-foreground">Cargando pacientes...</p>
        </div>
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 border bg-background rounded-md p-4">
      <div className="flex flex-col gap-1 mb-4">
        <p className="text-lg font-semibold">Pacientes</p>
        <p className="text-sm text-muted-foreground">
          Aquí puedes ver el historial de citas de tus pacientes ({patients.length} pacientes)
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-1 items-center space-x-2">
          <DataTableSearcher searchColumn="name" table={table} />
          <DataTableButtonReset table={table} />
        </div>
        <DataTableViewOptions table={table} />
      </div>
      <div className="border rounded-md bg-background">
        <DataTable table={table} />
      </div>
      <DataTablePagination table={table} />
    </div>
  );
};

export default PatientsTable;
