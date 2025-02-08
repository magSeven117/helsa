import { Pathology } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { useAction } from 'next-safe-action/hooks';
import { useEffect, useState } from 'react';
import { getPathologies } from '../actions/diagnostic/get-pathologies';

export function usePathologies() {
  const [pathologies, setPathologies] = useState<Primitives<Pathology>[] | null>(null);
  const { execute } = useAction(getPathologies, {
    onSuccess: (response) => {
      setPathologies(response?.data ?? null);
    },
  });

  useEffect(() => {
    execute();
  }, []);

  return {
    pathologies,
  };
}
