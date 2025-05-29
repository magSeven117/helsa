import { useMutation } from '@tanstack/react-query';

export const useCreateDoctor = () => {
  const {
    mutateAsync: createDoctor,
    isPending,
    error,
  } = useMutation({
    mutationKey: ['create-doctor'],
    mutationFn: async (data: { licenseMedicalNumber: string; id: string; specialtyId: string; userId: string }) => {
      const response = await fetch('/api/v1/doctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctor: data,
        }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
    },
  });
  return {
    createDoctor,
    isPending,
    error,
  };
};

export const useCreateHospital = () => {
  const {
    mutateAsync: createHospital,
    isPending,
    error,
  } = useMutation({
    mutationKey: ['create-hospital'],
    mutationFn: async (data: { hospital: { adminId: string; name: string; address: any } }) => {
      const response = await fetch('/api/v1/hospital', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hospital: data,
        }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
    },
  });
  return {
    createHospital,
    isPending,
    error,
  };
};

export const useCreatePatient = () => {
  const {
    mutateAsync: createPatient,
    isPending,
    error,
  } = useMutation({
    mutationKey: ['create-patient'],
    mutationFn: async (data: {
      userId: string;
      demographic: {
        occupation: string;
        civilStatus: string;
        educativeLevel: string;
      };
      biometric: {
        organDonor: string;
        bloodType: string;
        height: number;
      };
    }) => {
      const response = await fetch('/api/v1/patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patient: data,
        }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
    },
  });
  return {
    createPatient,
    isPending,
    error,
  };
};
