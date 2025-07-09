'use client';
import { searchDoctors } from '@helsa/engine/doctor/infrastructure/http/http-doctor-api';
import { useQuery } from '@tanstack/react-query';
import { ErrorFallback } from '../../../../../modules/shared/components/error-fallback';
import DoctorList from './doctor-list';
import DoctorSkeleton from './doctor-list-loading';

type Props = {
  filters: {
    q?: string;
    availability?: string;
    minRate?: number;
    experience?: number;
  };
};

const DoctorListWrapper = ({ filters }: Props) => {
  const {
    data: doctors,
    isLoading,
    error,
  } = useQuery({
    initialData: [],
    queryKey: ['doctors'],
    queryFn: async () => searchDoctors(filters),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <DoctorSkeleton />;
  }

  if (error) {
    return <ErrorFallback />;
  }

  return <DoctorList doctors={doctors} />;
};

export default DoctorListWrapper;
