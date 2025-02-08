import { getPathologies } from '@/src/actions/diagnostic/get-pathologies';
import Diagnosis from '@/src/components/appointment/call/diagnosis';
import Treatment from '@/src/components/appointment/call/treatment';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { Button } from '@helsa/ui/components/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@helsa/ui/components/dropdown-menu';
import { PlusCircle } from 'lucide-react';

const Actions = async ({ data }: { data: Primitives<Appointment> }) => {
  const pathologies = await getPathologies();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} className="gap-2">
          Actions
          <PlusCircle />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-none flex flex-col gap-1" align="end">
        <Diagnosis data={data} pathologies={pathologies?.data ?? []} />
        <Treatment data={data} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
