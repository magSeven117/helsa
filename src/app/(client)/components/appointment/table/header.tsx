'use client';

import { Button } from '@/libs/shadcn-ui/components/button';
import { Checkbox } from '@/libs/shadcn-ui/components/checkbox';
import { TableHead, TableHeader, TableRow } from '@/libs/shadcn-ui/components/table';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type Props = {
  table?: any;
  loading?: boolean;
};

export function AppointmentsTableHeader({ table, loading }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [column, value] = searchParams.get('sort')?.split(':') ?? [];
  const createSortQuery = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams);
      const prevSort = params.get('sort');

      if (`${name}:asc` === prevSort) {
        params.set('sort', `${name}:desc`);
      } else if (`${name}:desc` === prevSort) {
        params.delete('sort');
      } else {
        params.set('sort', `${name}:asc`);
      }

      router.replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname]
  );

  const isVisible = (id: any) =>
    loading ||
    table
      ?.getAllLeafColumns()
      .find((col: any) => col.id === id)
      .getIsVisible();

  return (
    <TableHeader>
      <TableRow className="h-[45px] hover:bg-transparent">
        <TableHead className="min-w-[50px] hidden md:table-cell px-3 md:px-4 py-2 border">
          <Checkbox
            className="rounded-none"
            checked={table?.getIsAllPageRowsSelected() || (table?.getIsSomePageRowsSelected() && 'indeterminate')}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          />
        </TableHead>
        {isVisible('date') && (
          <TableHead className="border">
            <Button
              className="p-0 hover:bg-transparent space-x-2"
              variant="ghost"
              onClick={() => createSortQuery('date')}
            >
              <span>Fecha</span>
              {'date' === column && value === 'asc' && <ArrowDown size={16} />}
              {'date' === column && value === 'desc' && <ArrowUp size={16} />}
            </Button>
          </TableHead>
        )}
        {isVisible('status') && (
          <TableHead className="border">
            <Button
              className="p-0 hover:bg-transparent space-x-2"
              variant="ghost"
              onClick={() => createSortQuery('status')}
            >
              <span>Estado</span>
              {'status' === column && value === 'asc' && <ArrowDown size={16} />}
              {'status' === column && value === 'desc' && <ArrowUp size={16} />}
            </Button>
          </TableHead>
        )}
        {isVisible('doctor') && (
          <TableHead className="border">
            <span>Doctor</span>
          </TableHead>
        )}

        {isVisible('type') && (
          <TableHead className="border">
            <span>Tipo de consulta</span>
          </TableHead>
        )}
      </TableRow>
    </TableHeader>
  );
}
