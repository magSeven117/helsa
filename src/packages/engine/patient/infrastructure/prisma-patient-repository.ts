import { PrismaClient } from '@helsa/database';
import { PrismaCriteriaConverter } from '@helsa/database/converter';
import { Criteria } from '@helsa/ddd/core/criteria';
import { Primitives } from '@helsa/ddd/types/primitives';
import { subDays } from 'date-fns';
import { AppointmentTelemetry } from '../../appointment/domain/telemetry';
import { Patient } from '../domain/patient';
import { PatientRepository } from '../domain/patient-repository';
import { DoctorPatientWithStats, DoctorPatientFilter, DoctorPatientPagination, DoctorPatientSort } from '../application/services/get-doctor-patients';

export class PrismaPatientRepository implements PatientRepository {
  private converter = new PrismaCriteriaConverter();
  constructor(private client: PrismaClient) {}

  get model() {
    return this.client.patient;
  }

  async save(patient: Patient): Promise<void> {
    const data = patient.toPrimitives();
    await this.model.upsert({
      where: { id: data.id },
      update: {
        userId: data.userId,
        demographic: data.demographic,
        biometric: data.biometric,
      },
      create: {
        id: data.id,
        userId: data.userId,
        demographic: data.demographic,
        biometric: data.biometric,
      },
    });
  }

  async find(criteria: Criteria): Promise<Patient | null> {
    const { where, include } = this.converter.criteria(criteria);
    const patient = await this.model.findFirst({
      where,
      include,
    });
    if (!patient) return null;
    return Patient.fromPrimitives(patient as unknown as Primitives<Patient>);
  }
  async search(criteria: Criteria): Promise<Patient[]> {
    const { orderBy, skip, take, where } = this.converter.criteria(criteria);
    const patients = await this.model.findMany({
      where,
      include: {
        contacts: true,
        vaccines: true,
        surgeries: true,
      },
      orderBy,
      skip,
      take,
    });
    return patients.map((patient) => Patient.fromPrimitives(patient as unknown as Primitives<Patient>));
  }

  async getVitals(userId: string): Promise<AppointmentTelemetry[]> {
    const patient = await this.model.findFirst({
      where: { userId },
      include: {
        appointments: {
          where: { date: { gte: subDays(new Date(), 30) } },
          select: {
            telemetry: true,
          },
        },
      },
    });
    if (!patient) throw new Error('Patient not found');
    const vitals = patient.appointments
      .filter((a) => a.telemetry)
      .map((appointment) =>
        AppointmentTelemetry.fromPrimitives(appointment.telemetry! as unknown as Primitives<AppointmentTelemetry>),
      );
    return vitals;
  }

  async getPatientsByDoctorId(
    doctorId: string,
    filters: DoctorPatientFilter,
    pagination?: DoctorPatientPagination,
    sort?: DoctorPatientSort,
  ): Promise<DoctorPatientWithStats[]> {
    const page = pagination?.page || 0;
    const pageSize = pagination?.pageSize || 10;
    const skip = page * pageSize;

    // Construir filtros de búsqueda
    const whereClause: any = {
      appointments: {
        some: {
          doctorId: doctorId,
        },
      },
    };

    // Filtro por búsqueda de nombre
    if (filters.search) {
      whereClause.user = {
        name: {
          contains: filters.search,
          mode: 'insensitive',
        },
      };
    }

    // Filtro por rango de última visita
    if (filters.lastVisitStart || filters.lastVisitEnd) {
      whereClause.appointments = {
        ...whereClause.appointments,
        some: {
          ...whereClause.appointments.some,
          date: {
            ...(filters.lastVisitStart && { gte: new Date(filters.lastVisitStart) }),
            ...(filters.lastVisitEnd && { lte: new Date(filters.lastVisitEnd) }),
          },
        },
      };
    }

    // Filtro por estado de cita
    if (filters.appointmentStatus && filters.appointmentStatus.length > 0) {
      whereClause.appointments = {
        ...whereClause.appointments,
        some: {
          ...whereClause.appointments.some,
          status: {
            in: filters.appointmentStatus,
          },
        },
      };
    }

    // Construir ordenamiento
    let orderBy: any = { createdAt: 'desc' };
    if (sort?.sortBy && sort?.order) {
      if (sort.sortBy === 'name') {
        orderBy = { user: { name: sort.order } };
      } else if (sort.sortBy === 'lastVisit') {
        orderBy = {
          appointments: {
            _count: 'desc',
          },
        };
      } else {
        orderBy = { [sort.sortBy]: sort.order };
      }
    }

    const patients = await this.model.findMany({
      where: whereClause,
      include: {
        user: true,
        appointments: {
          where: {
            doctorId: doctorId,
          },
          orderBy: {
            date: 'desc',
          },
          take: 1,
          select: {
            date: true,
            status: true,
          },
        },
        _count: {
          select: {
            appointments: {
              where: {
                doctorId: doctorId,
              },
            },
          },
        },
      },
      orderBy,
      skip,
      take: pageSize,
    });

    return patients.map((patient) => {
      const user = patient.user as any;
      const demographic = patient.demographic as any;
      const biometric = patient.biometric as any;
      const lastAppointment = patient.appointments[0];

      // Calcular edad si tenemos fecha de nacimiento en demographic
      let age: number | undefined;
      if (demographic?.birthDate) {
        const birthDate = new Date(demographic.birthDate);
        const today = new Date();
        age = today.getFullYear() - birthDate.getFullYear();
      }

      return {
        id: patient.id,
        userId: patient.userId,
        name: user?.name || 'Sin nombre',
        email: user?.email || '',
        age,
        lastVisit: lastAppointment?.date?.toISOString(),
        totalAppointments: patient._count.appointments,
        lastAppointmentStatus: lastAppointment?.status,
        demographic: {
          civilStatus: demographic?.civilStatus || '',
          occupation: demographic?.occupation || '',
          educativeLevel: demographic?.educativeLevel || '',
        },
        biometric: {
          height: biometric?.height || 0,
          bloodType: biometric?.bloodType || '',
          organDonor: biometric?.organDonor || '',
        },
      };
    });
  }
}
