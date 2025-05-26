import { Primitives } from '@helsa/ddd/types/primitives';
import { ConsultingRoomAddress } from '@helsa/engine/doctor/domain/consulting-room-address';
import { Doctor } from '@helsa/engine/doctor/domain/doctor';
import { Education } from '@helsa/engine/doctor/domain/educations';
import { Specialty } from '@helsa/engine/doctor/domain/specialty';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useDoctor = (id: string) => {
  const {
    data: doctor,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['doctor'],
    queryFn: async () => {
      const include = {
        educations: true,
        consultingRoomAddress: true,
      };
      const response = await fetch(`/api/v1/doctor/${id}?include=${JSON.stringify(include)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch doctor data');
      }

      const data = await response.json();
      return data.data as Primitives<Doctor>;
    },
    refetchOnWindowFocus: false,
  });
  return {
    doctor,
    isLoading,
    error,
  };
};

export const useSpecialties = () => {
  const {
    data: specialties,
    isLoading,
    error,
  } = useQuery({
    initialData: [],
    queryKey: ['specialties'],
    queryFn: async () => {
      const response = await fetch('/api/v1/doctor/specialties', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch specialties data');
      }

      const data = await response.json();
      return data.data as Primitives<Specialty>[];
    },
    refetchOnWindowFocus: false,
  });
  return {
    specialties,
    isLoading,
    error,
  };
};

export const useUpdateDoctor = (id: string) => {
  const client = useQueryClient();
  const {
    mutateAsync: updateDoctor,
    isPending,
    error,
  } = useMutation({
    mutationKey: ['update-doctor'],
    mutationFn: async (doctor: Partial<Primitives<Doctor>>) => {
      const response = await fetch(`/api/v1/doctor/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doctor }),
      });
      if (!response.ok) {
        throw new Error('Failed to update doctor data');
      }
      return response.json();
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['doctor'] });
    },
  });
  return {
    updateDoctor,
    isPending,
    error,
  };
};

export const useAddress = (id: string) => {
  const {
    mutateAsync: saveConsultingRoomAddress,
    isPending,
    error,
  } = useMutation({
    mutationKey: ['update-doctor-address'],
    mutationFn: async (address: Partial<Primitives<ConsultingRoomAddress>>) => {
      const response = await fetch(`/api/v1/doctor/${id}/consulting-room`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ consultingRoomAddress: address }),
      });
      if (!response.ok) {
        throw new Error('Failed to update doctor address');
      }
      return response.json();
    },
  });
  return {
    saveConsultingRoomAddress,
    isPending,
    error,
  };
};

export const useSaveEducations = (id: string) => {
  const client = useQueryClient();
  const {
    mutateAsync: saveEducations,
    isPending,
    error,
  } = useMutation({
    mutationKey: ['save-educations'],
    mutationFn: async (education: Partial<Primitives<Education>>) => {
      const response = await fetch(`/api/v1/doctor/${id}/education`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ education }),
      });
      if (!response.ok) {
        throw new Error('Failed to save educations');
      }
      return response.json();
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['doctor'] });
    },
  });
  return {
    saveEducations,
    isPending,
    error,
  };
};

export const useRemoveEducation = (id: string) => {
  const client = useQueryClient();
  const {
    mutateAsync: removeEducation,
    isPending,
    error,
  } = useMutation({
    mutationKey: ['remove-education'],
    mutationFn: async (educationId: string) => {
      const response = await fetch(`/api/v1/doctor/${id}/education/${educationId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to remove education');
      }
      return response.json();
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['doctor'] });
    },
  });
  return {
    removeEducation,
    isPending,
    error,
  };
};
