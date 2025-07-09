'use client';
import { useSession } from '@/src/app/(app)/(main)/_components/session-provider';
import { getDoctorPrices } from '@helsa/engine/doctor/infrastructure/http/http-doctor-api';
import { useQuery } from '@tanstack/react-query';
import { TypesSkeleton } from './skeleton';
import { DataTable } from './table';

export function TypesTable() {
  const { profile } = useSession();

  const { data: prices, isLoading } = useQuery({
    initialData: [],
    queryKey: ['prices', profile.id],
    queryFn: async () => getDoctorPrices(profile.id),
    enabled: () => !!profile.id,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <TypesSkeleton />;
  }

  return <DataTable data={prices} doctorId={profile.id} />;
}
