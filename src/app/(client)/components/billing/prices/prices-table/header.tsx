'use client';

import { Button } from '@/libs/shadcn-ui/components/button';

type Props = {
  onOpenChange?: (isOpen: boolean) => void;
};

export function Header({ onOpenChange }: Props) {
  return (
    <div className="flex items-center py-4 justify-between">
      <Button className="h-9" variant={'secondary'} onClick={() => onOpenChange?.(true)}>
        Crear tus tarifas
      </Button>
    </div>
  );
}
