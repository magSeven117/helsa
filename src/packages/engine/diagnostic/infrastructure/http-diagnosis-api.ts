import { Primitives } from '@helsa/ddd/types/primitives';
import { Diagnostic } from '../domain/diagnostic';
import { Pathology } from '../domain/pathology';

export async function patientDiagnoses(id: string) {
  const response = await fetch(`/api/v1/diagnosis?id=${id}&field=patientId`);
  if (!response.ok) {
    const error: { message: string } = await response.json();
    throw new Error(error.message);
  }
  const json = await response.json();
  return json.data as Primitives<Diagnostic>[];
}

export async function appointmentDiagnoses(id: string) {
  const response = await fetch(`/api/v1/diagnosis?id=${id}&field=appointmentId`);
  if (!response.ok) {
    const error: { message: string } = await response.json();
    throw new Error(error.message);
  }
  const json = await response.json();
  return json.data as Primitives<Diagnostic>[];
}

export async function saveDiagnosis(diagnosis: Partial<Primitives<Diagnostic>>) {
  const response = await fetch('/api/v1/diagnosis', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(diagnosis),
  });
  if (!response.ok) {
    const error: { message: string } = await response.json();
    throw new Error(error.message);
  }
}

export async function getPathologies() {
  const response = await fetch('/api/v1/diagnosis/pathology');
  if (!response.ok) {
    const error: { message: string } = await response.json();
    throw new Error(error.message);
  }
  const json = await response.json();
  return json.data as Primitives<Pathology>[];
}
