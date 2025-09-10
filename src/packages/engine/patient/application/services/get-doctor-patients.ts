import { Meta } from '@helsa/ddd/core/collection';
import { Direction } from '@helsa/ddd/core/criteria';
import { NotFoundError } from '@helsa/ddd/core/errors/not-found-error';
import { Primitives } from '@helsa/ddd/types/primitives';
import { GetDoctor } from '../../doctor/application/services/get-doctor';
import { Patient } from '../domain/patient';
import { PatientRepository } from '../domain/patient-repository';

export interface DoctorPatientFilter {
  search?: string;
  lastVisitStart?: string;
  lastVisitEnd?: string;
  appointmentStatus?: string[];
}

export interface DoctorPatientPagination {
  page?: number;
  pageSize?: number;
}

export interface DoctorPatientSort {
  sortBy?: string;
  order?: string;
}

export interface DoctorPatientWithStats {
  id: string;
  userId: string;
  name: string;
  email: string;
  age?: number;
  lastVisit?: string;
  totalAppointments: number;
  lastAppointmentStatus?: string;
  demographic: {
    civilStatus: string;
    occupation: string;
    educativeLevel: string;
  };
  biometric: {
    height: number;
    bloodType: string;
    organDonor: string;
  };
}

export type GetDoctorPatientsErrors = NotFoundError;

export class GetDoctorPatients {
  constructor(
    private patientRepository: PatientRepository,
    private doctorGetter: GetDoctor,
  ) {}

  async run(
    doctorId: string,
    filters: DoctorPatientFilter = {},
    pagination?: DoctorPatientPagination,
    sort?: DoctorPatientSort,
    field = 'userId',
  ): Promise<{ data: DoctorPatientWithStats[]; meta: Meta }> {
    // Verificar que el doctor existe
    const doctor = await this.doctorGetter.run(doctorId, field);
    if (!doctor) {
      throw new NotFoundError(`Doctor with ${field} ${doctorId} not found`);
    }

    // Obtener pacientes únicos que han tenido citas con este doctor
    const patients = await this.patientRepository.getPatientsByDoctorId(
      doctor.id,
      filters,
      pagination,
      sort,
    );

    return {
      data: patients,
      meta: {
        total: patients.length,
        page: pagination?.page || 0,
        pageSize: pagination?.pageSize || 10,
      },
    };
  }
}





