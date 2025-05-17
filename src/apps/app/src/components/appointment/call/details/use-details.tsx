'use client';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Diagnostic } from '@helsa/engine/diagnostic/domain/diagnostic';
import { Treatment } from '@helsa/engine/treatment/domain/treatment';
import { useQueries } from '@tanstack/react-query';

export const useDetails = (id: string) => {
  const { loading, treatments, diagnoses } = useQueries({
    queries: [
      {
        initialData: [],
        queryKey: ['diagnoses'],
        queryFn: async () => {
          const response = await fetch(`/api/v1/diagnosis?id=${id}&field=patientId`);
          if (!response.ok) {
            throw new Error('Failed to fetch symptoms');
          }
          const json = await response.json();
          return json.data as Primitives<Diagnostic>[];
        },
      },
      {
        initialData: [],
        queryKey: ['treatments'],
        queryFn: async () => {
          const response = await fetch(`/api/v1/treatment?patientId=${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch symptoms');
          }
          const json = await response.json();
          return json.data as Primitives<Treatment>[];
        },
      },
    ],
    combine: (results) => {
      const [diagnoses, treatments] = results;
      return {
        diagnoses,
        treatments,
        loading: diagnoses.isLoading || treatments.isLoading,
      };
    },
  });
  return {
    loading,
    treatments: treatments.data,
    diagnoses: diagnoses.data,
  };
};
