import { database } from '@helsa/database';
import { GetDoctors } from '@helsa/engine/doctor/application/services/get-doctors';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { tool } from 'ai';
import { z } from 'zod';

export const getDoctors = () => {
  return tool({
    description: 'Get a list of doctors filter by some criteria',
    parameters: z.object({
      q: z.string().optional().describe('Search query to filter doctors by name'),
      availability: z
        .string()
        .optional()
        .describe(
          'Filter doctors by date availability, e.g.,  format is ISO 8601 (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ssZ)',
        ),
      minRate: z.number().optional().describe('Minimum rating of the doctor, e.g., 4.5'),
      experience: z.number().optional().describe('Minimum years of experience of the doctor, e.g., 5'),
    }),
    execute: async ({ q, availability, minRate, experience }) => {
      const service = new GetDoctors(new PrismaDoctorRepository(database));
      const doctors = await service.run(
        {
          q,
          availability: availability,
          minRate,
          experience,
        },
        3,
      );
      return {
        doctors,
      };
    },
  });
};
