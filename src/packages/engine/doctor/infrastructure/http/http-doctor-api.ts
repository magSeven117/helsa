import { Primitives } from '@helsa/ddd/types/primitives';
import { Doctor } from '../../domain/doctor';
import { Price } from '../../domain/price';
import { Schedule } from '../../domain/schedule';

export async function searchDoctors(filters: {
  q?: string;
  availability?: string;
  minRate?: number;
  experience?: number;
}): Promise<Primitives<Doctor>[]> {
  const response = await fetch(`/api/v1/doctor?filters=${JSON.stringify(filters)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch doctors');
  }

  const json = await response.json();
  return json.data as Primitives<Doctor>[];
}

export async function getDoctorPrices(doctorId: string) {
  const response = await fetch(`/api/v1/doctor/${doctorId}/price`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch doctor prices');
  }

  const json = await response.json();
  return json.data as Primitives<Price>[];
}

export async function deleteDoctorPrice(doctorId: string, priceId: string) {
  const response = await fetch(`/api/v1/doctor/${doctorId}/price/${priceId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error: { message: string } = await response.json();
    throw new Error(error.message);
  }
}

export async function createDoctor(data: {
  licenseMedicalNumber: string;
  id: string;
  specialtyId: string;
  userId: string;
}) {
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
}

export async function createDoctorPrice(
  doctorId: string,
  data: {
    id: string;
    typeId: string;
    amount: number;
    currency: string;
    duration: number;
    doctorId: string;
    name: string;
  },
) {
  const response = await fetch(`/api/v1/doctor/${doctorId}/price`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error: { message: string } = await response.json();
    throw new Error(error.message);
  }
}

export async function saveSchedule(data: {
  doctorId: string;
  days: { day: string; hours: { hour: string }[] }[];
  duration?: number;
  maxAppointment?: number;
}) {
  const { doctorId, days, duration, maxAppointment } = data;
  const response = await fetch(`/api/v1/doctor/${doctorId}/schedule`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ days, duration, maxAppointment }),
  });
  if (!response.ok) {
    const error: { message: string } = await response.json();
    throw new Error(error.message);
  }
}

export async function getDoctorSchedule(doctorId: string) {
  const response = await fetch(`/api/v1/doctor/${doctorId}/schedule`);
  if (!response.ok) {
    throw new Error('Failed to fetch schedule');
  }
  const data = await response.json();
  return data.data as Primitives<Schedule>;
}
