'use client';

import { Loader2 } from 'lucide-react';
import { useSession } from '../../../auth/components/session-provider';
import { useHospital } from '../../hooks/use-hospital';
import { AddressSection } from './address-section';
import { NameSection } from './name-section';

export const HospitalProfileIndex = () => {
  const { profile } = useSession();
  const { hospital, isLoading, error } = useHospital(profile.id);
  if (isLoading) {
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
