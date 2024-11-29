import { isValid } from 'date-fns';
import { z } from 'zod';

export const parseDateSchema = z
  .date()
  .transform((value) => new Date(value))
  .transform((v) => isValid(v))
  .refine((v) => !!v, { message: 'Invalid date' });
export const filterDoctorsSchema = z.object({
  name: z.string().optional().describe('The name to search for'),
  availability: parseDateSchema.optional().describe('The date to filter by. Return ISO-8601 format.'),
  specialties: z.array(z.string()).optional().describe('The medical specialties to filter by'),
  minRate: z.number().optional().describe('The min score rate to filter by'),
  experience: z.number().optional().describe('The minimal experience years to filter by'),
});
