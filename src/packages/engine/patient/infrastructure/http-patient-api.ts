import { Primitives } from '@helsa/ddd/types/primitives';
import { Patient } from '../domain/patient';

export async function createPatient(data: {
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
}) {
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
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      try {
        const textError = await response.text();
        if (textError) {
          errorMessage = textError;
        }
      } catch {
        // Fallback to default error message
      }
    }
    
    throw new Error(errorMessage);
  }

  try {
    return await response.json();
  } catch {
    return { success: true };
  }
}

export const getPatient = async (id: string, include = {}) => {
  const response = await fetch(`/api/v1/patient/${id}?include=${JSON.stringify(include)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error: { message: string } = await response.json();
    throw new Error(error.message);
  }

  const data = await response.json();
  console.log(data);
  return data.data as Primitives<Patient>;
};

export async function updatePatientDemographic(id: string, demographic: Record<string, any>) {
  const response = await fetch(`/api/v1/patient/${id}/demographic`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ demographic }),
  });

  if (!response.ok) {
    const error: { message: string } = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}

export async function updatePatientBiometric(id: string, biometric: Record<string, any>) {
  const response = await fetch(`/api/v1/patient/${id}/biometric`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ biometric }),
  });

  if (!response.ok) {
    const error: { message: string } = await response.json();
    throw new Error(error.message);
  }
}
