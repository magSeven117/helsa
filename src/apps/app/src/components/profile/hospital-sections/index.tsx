'use client';

import { getHospital } from '@helsa/engine/hospital/infrastructure/http-hospital-api';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useSession } from '../../auth/session-provider';
import { AddressSection } from './address-section';
import { NameSection } from './name-section';

export const HospitalProfileIndex = () => {
  const { profile } = useSession();
  const {
    data: hospital,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['hospital', profile.id],
    queryFn: async () => getHospital(profile.id),
    refetchOnWindowFocus: false,
    enabled: () => !!profile.id,
  });
  if (isLoading || !hospital || error) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin size-8" />
      </div>
    );
  }
  return (
    <>
      <NameSection name={hospital.name} id={hospital.id} />
      <AddressSection address={hospital.address} id={hospital.id} />
    </>
  );
};
