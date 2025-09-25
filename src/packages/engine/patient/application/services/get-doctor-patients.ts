import { NotFoundError } from '@helsa/ddd/core/errors/not-found-error';
import { PatientRepository } from '../../domain/patient-repository';
import { GetDoctor } from '../../../doctor/application/services/get-doctor';

// Tipos para el filtrado de pacientes
export interface DoctorPatientFilter {
  search?: string;
  lastVisitStart?: string;
  lastVisitEnd?: string;
  appointmentStatus?: string[];
}

// Tipos para la paginación
export interface DoctorPatientPagination {
  page?: number;
  pageSize?: number;
}

// Tipos para el ordenamiento
export interface DoctorPatientSort {
  sortBy?: string;
  order?: string;
}

// Tipo para los datos de paciente con estadísticas
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

// Errores específicos del servicio
export type GetDoctorPatientsErrors = NotFoundError;

export class GetDoctorPatients {
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly getDoctorService: GetDoctor
  ) {}

  async run(
    doctorId: string,
    filters: DoctorPatientFilter,
    pagination: DoctorPatientPagination = {},
    sort: DoctorPatientSort = {},
    userIdField: string = 'userId'
  ): Promise<DoctorPatientWithStats[]> {
    // Verificar que el doctor existe
    const doctor = await this.getDoctorService.run(doctorId, userIdField);
    if (!doctor) {
      throw new NotFoundError('Doctor not found');
    }

    // Obtener pacientes del doctor con filtros, paginación y ordenamiento
    const patients = await this.patientRepository.getPatientsByDoctorId(
      doctorId,
      filters,
      pagination,
      sort
    );

    return patients;
  }
}
