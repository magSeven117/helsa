import { Primitives } from '@helsa/ddd/types/primitives';
import { Patient } from '@helsa/engine/patient/domain/patient';

export const getPatient = async (id: string, include = {}) => {
  const response = await fetch(`/api/v1/patient/${id}?include=${JSON.stringify(include)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch patient with ID ${id}: ${response.statusText}`);
  }

  const data = await response.json();
  console.log(data);
  return data.data as Primitives<Patient>;
};
