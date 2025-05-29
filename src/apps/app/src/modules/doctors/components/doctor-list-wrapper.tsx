'use client';
import { ErrorFallback } from '../../shared/components/error-fallback';
import { useDoctors } from '../hooks/use-doctors';
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
  const { doctors, isLoading, error } = useDoctors(filters);

  if (isLoading) {
    return <DoctorSkeleton />;
  }

  if (error) {
    return <ErrorFallback />;
  }

  return <DoctorList doctors={doctors} />;
};

export default DoctorListWrapper;
