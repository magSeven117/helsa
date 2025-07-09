import { Primitives } from '@helsa/ddd/types/primitives';
import { Treatment } from '../domain/treatment';

export async function patientTreatments(id: string) {
  const response = await fetch(`/api/v1/treatment?patientId=${id}`);
  if (!response.ok) {
    const error: { message: string } = await response.json();
    throw new Error(error.message);
  }
  const json = await response.json();
  return json.data as Primitives<Treatment>[];
}

export async function appointmentTreatments(appointmentId: string) {
  const response = await fetch(`/api/v1/treatment?appointmentId=${appointmentId}`);
  if (!response.ok) {
    const error: { message: string } = await response.json();
    throw new Error(error.message);
  }
  const json = await response.json();
  return json.data as Primitives<Treatment>[];
}

export async function saveTreatment(treatment: Partial<Primitives<Treatment>>) {
  const response = await fetch('/api/v1/treatment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(treatment),
  });
  if (!response.ok) {
    const error: { message: string } = await response.json();
    throw new Error(error.message);
  }
}
