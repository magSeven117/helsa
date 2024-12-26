'use client';
import { useAppointmentStore } from '@/src/store/appointments-store';
import { Button } from '@helsa/ui/components/button';
import { Checkbox } from '@helsa/ui/components/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@helsa/ui/components/popover';
import { SlidersIcon } from 'lucide-react';

export function ColumnVisibility({ disabled }: { disabled?: boolean }) {
  const { columns } = useAppointmentStore();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" disabled={disabled} className="h-9 rounded-none">
          <SlidersIcon size={18} />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0 rounded-none" align="start">
        <div className="flex flex-col p-4 space-y-2 max-h-[352px] overflow-auto">
          {columns
            .filter((column) => column.columnDef.enableHiding !== false && column.id !== 'status')
            .map((column) => {
              return (
                <div key={column.id} className="flex items-center space-x-2">
                  <Checkbox
                    className="rounded-none"
                    id={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(checked) => column.toggleVisibility(checked)}
                  />
                  <label
                    htmlFor={column.id}
                    className="text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {column.columnDef.header}
                  </label>
                </div>
              );
            })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
