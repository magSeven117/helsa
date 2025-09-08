import { Meta } from '@helsa/ddd/core/collection.';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Doctor } from '../../../doctor/domain/doctor';
import { Specialty } from '../../../doctor/domain/specialty';
import { Patient } from '../../../patient/domain/patient';
import { Appointment } from '../../domain/appointment';
import { AppointmentType } from '../../domain/appointment-type';
import { AppointmentNote } from '../../domain/note';
import { AppointmentStatusEnum } from '../../domain/status';
import { Symptom } from '../../domain/symptom';
import { AppointmentTelemetry } from '../../domain/telemetry';

export async function listAppointments({
  filter,
  pagination,
  sort,
}: {
  filter: {
    start?: string;
    end?: string;
    states?: string[];
    specialties?: string[];
    types?: string[];
  };
  pagination: {
    page?: number;
    pageSize?: number;
  };
  sort: {
    sortBy?: string;
    order?: string;
  };
}) {
  const response = await fetch(
    `/api/v1/appointment?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(
      pagination,
    )}&sort=${JSON.stringify(sort)}`,
  );
  if (!response.ok) {
    const error: { message: string } = await response.json();
    throw new Error(error.message);
  }
  const json = await response.json();
  return json.data as { data: Primitives<Appointment>[]; meta: Meta };
}

export async function getAppointment(
  id: string,
  include: any = {
    specialty: true,
    doctor: { include: { user: true } },
    patient: { include: { user: true } },
    diagnostics: true,
    treatments: { include: { medication: true } },
    orders: true,
  },
) {
  const response = await fetch(`/api/v1/appointment/${id}?include=${JSON.stringify(include)}`);
  if (!response.ok) {
    const error: { message: string } = await response.json();
    throw new Error(error.message);
  }
  const json = await response.json();
  return json.data as Primitives<Appointment>;
}

export async function createAppointment(data: {
  date: Date;
  motive: string;
  symptoms: string[];
  doctorId: string;
  typeId: string;
  id: string;
  specialtyId: string;
  priceId: string;
}) {
  const response = await fetch('/api/v1/appointment', {
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
  return response;
}

export async function finalizeAppointment(id: string) {
  if (!id) {
    throw new Error('ID is required');
  }
  const response = await fetch(`/api/v1/appointment/${id}`, {
    method: 'PUT',
  });
  if (!response.ok) {
    const error: { message: string } = await response.json();
    throw new Error(error.message);
  }
}

export async function getNotes(appointmentId: string) {
  const response = await fetch(`/api/v1/appointment/${appointmentId}/notes`);
  if (!response.ok) {
    const error: { message: string } = await response.json();
    throw new Error(error.message);
  }
  const json = await response.json();
  return json.data as Primitives<AppointmentNote>[];
}

export async function saveNote(data: { appointmentId: string; note: string; id: string; isPublic: boolean }) {
  const response = await fetch(`/api/v1/appointment/${data.appointmentId}/notes`, {
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

export async function enterAppointmentRoom(appointmentId: string) {
  if (!appointmentId) {
    throw new Error('Appointment ID is required');
  }
  const response = await fetch(`/api/v1/appointment/${appointmentId}/room`, {
    method: 'PUT',
  });
  if (!response.ok) {
    const error: { message: string } = await response.json();
    throw new Error(error.message);
  }
}

export async function getAppointmentRoom(appointmentId: string) {
  if (!appointmentId) {
    throw new Error('Appointment ID is required');
  }
  const response = await fetch(`/api/v1/appointment/${appointmentId}/room`);
  if (!response.ok) {
    const error: { message: string } = await response.json();
    throw new Error(error.message);
  }
  const json = await response.json();
  return {
    token: json.token as string,
    roomUrl: json.roomUrl as string
  };
}

export async function getAppointmentTypes() {
  const response = await fetch('/api/v1/appointment/types');
  if (!response.ok) {
    const error: { message: string } = await response.json();
    throw new Error(error.message);
  }
  const json = await response.json();
  return json.data as Primitives<AppointmentType>[];
}

export async function saveAppointmentVitals(data: Partial<Primitives<AppointmentTelemetry>>, appointmentId: string) {
  const response = await fetch(`/api/v1/appointment/${appointmentId}/vitals`, {
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
  return response.json();
}

export async function getSymptoms() {
  const response = await fetch('/api/v1/symptom');
  if (!response.ok) {
    const error: { message: string } = await response.json();
    throw new Error(error.message);
  }
  const json = await response.json();
  return json.data as Primitives<Symptom>[];
}

export const appointmentInitialData: Primitives<Appointment> = {
  id: '',
  date: new Date(),
  patientId: '',
  doctorId: '',
  motive: '',
  symptoms: [],
  doctor: { user: { name: '', image: '', id: '' }, id: '' } as Primitives<Doctor>,
  patient: { user: { name: '', image: '', id: '' }, id: '' } as Primitives<Patient>,
  specialty: { name: '', id: '' } as Primitives<Specialty>,
  diagnostics: [],
  treatments: [],
  orders: [],
  createdAt: new Date(),
  hour: '',
  day: '',
  type: { id: '', name: '', color: '' },
  status: AppointmentStatusEnum.SCHEDULED,
  price: { amount: 0, currency: 'USD', doctorId: '', duration: 0, id: '', name: '', typeId: '' },
  typeId: '',
  priceId: '',
  specialtyId: '',
  updatedAt: new Date(),
};
