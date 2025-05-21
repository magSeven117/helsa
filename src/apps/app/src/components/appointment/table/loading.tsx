'use client';

import { Skeleton } from '@helsa/ui/components/skeleton';
import { Table, TableBody, TableCell, TableRow } from '@helsa/ui/components/table';
import { cn } from '@helsa/ui/lib/utils';
import { AppointmentsTableHeader } from './header';

const data = [...Array(10)].map((_, i) => ({ id: i.toString() }));

export function Loading({ isEmpty }: { isEmpty?: boolean }) {
  return (
    <div className="mb-8 relative w-full border rounded-xl">
      <Table className="">
        <AppointmentsTableHeader loading />

        <TableBody className="w-full">
          {data?.map((row) => (
            <TableRow key={row.id} className="h-[40px] md:h-[45px] cursor-pointer select-text">
              <TableCell className="w-[50px]">
                <Skeleton className={cn('h-3.5 w-[15px]')} />
              </TableCell>

              <TableCell className="w-[400px]">
                <Skeleton className={cn('h-3.5 w-[60%]')} />
              </TableCell>
              <TableCell className="w-[430px]">
                <Skeleton className={cn('h-3.5 w-[50%]')} />
              </TableCell>
              <TableCell className="w-[300px]">
                <Skeleton className={cn('h-3.5 w-[50%]')} />
              </TableCell>

              <TableCell className="w-[300px]">
                <Skeleton className={cn('h-3.5 w-[60%]')} />
              </TableCell>
              <TableCell className="w-[50px]">
                <Skeleton className={cn('h-3.5 w-[60%]')} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
