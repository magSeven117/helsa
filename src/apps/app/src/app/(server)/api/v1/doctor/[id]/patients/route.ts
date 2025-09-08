import { HttpNextResponse } from '@helsa/api/http-next-response';
import { routeHandler } from '@helsa/api/route-handler';
import { database } from '@helsa/database';
import { GetDoctorPatients, GetDoctorPatientsErrors } from '@helsa/engine/patient/application/services/get-doctor-patients';
import { PrismaPatientRepository } from '@helsa/engine/patient/infrastructure/prisma-patient-repository';
import { GetDoctor } from '@helsa/engine/doctor/application/services/get-doctor';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { z } from 'zod';

const queryParamsSchema = z.object({
  filter: z.string().optional(),
  pagination: z.string().optional(),
  sort: z.string().optional(),
});

const filterSchema = z.object({
  search: z.string().optional(),
  lastVisitStart: z.string().optional(),
  lastVisitEnd: z.string().optional(),
  appointmentStatus: z.array(z.string()).optional(),
});

const paginationSchema = z.object({
  page: z.number().optional(),
  pageSize: z.number().optional(),
});

const sortSchema = z.object({
  sortBy: z.string().optional(),
  order: z.string().optional(),
});

export const GET = routeHandler(
  {
    name: 'get-doctor-patients',
    querySchema: queryParamsSchema,
  },
  async ({ params, searchParams }) => {
    const service = new GetDoctorPatients(
      new PrismaPatientRepository(database),
      new GetDoctor(new PrismaDoctorRepository(database))
    );

    // Parsear parámetros de búsqueda
    const parsedSearchParams = {
      filter: JSON.parse(searchParams.filter || '{}'),
      pagination: JSON.parse(searchParams.pagination || '{}'),
      sort: JSON.parse(searchParams.sort || '{}'),
    };

    // Validar schemas
    const filters = filterSchema.parse(parsedSearchParams.filter);
    const pagination = paginationSchema.parse(parsedSearchParams.pagination);
    const sort = sortSchema.parse(parsedSearchParams.sort);

    const response = await service.run(
      params.id,
      filters,
      pagination,
      sort,
      'userId'
    );

    return HttpNextResponse.json({ data: response });
  },
  (error: GetDoctorPatientsErrors) => {
    switch (true) {
      case error instanceof Error && error.message.includes('not found'):
        return HttpNextResponse.domainError(error, 404);
      default:
        return HttpNextResponse.internalServerError();
    }
  }
);
