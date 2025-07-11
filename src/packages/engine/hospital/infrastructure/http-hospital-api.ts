import { Primitives } from '@helsa/ddd/types/primitives';
import { Hospital } from '../domain/hospital';

export async function createHospital(data: { hospital: { adminId: string; name: string; address: any } }) {
  const response = await fetch('/api/v1/hospital', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
}

export async function getHospital(id: string) {
  const response = await fetch(`/api/v1/hospital/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error: { message: string } = await response.json();
    throw new Error(error.message);
  }

  const json = await response.json();
  return json.data as Primitives<Hospital>;
}

export async function updateHospital(
  id: string,
  data: { name?: string; address?: { city?: string; street?: string; country?: string; zipCode?: string } },
) {
  const response = await fetch(`/api/v1/hospital/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ hospital: data }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
}
