'use server';
import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { anthropic } from '@ai-sdk/anthropic';
import { streamObject } from 'ai';
import { createStreamableValue } from 'ai/rsc';
import { isValid } from 'date-fns';
import { z } from 'zod';

const parseDateSchema = z
  .date()
  .transform((value) => new Date(value))
  .transform((v) => isValid(v))
  .refine((v) => !!v, { message: 'Invalid date' });
const filterDoctorsSchema = z.object({
  name: z.string().optional().describe('The name to search for'),
  availability: parseDateSchema.optional().describe('The date to filter by. Return ISO-8601 format.'),
  specialties: z.array(z.string()).optional().describe('The medical specialties to filter by'),
  minRate: z.number().optional().describe('The min score rate to filter by'),
  experience: z.number().optional().describe('The minimal experience years to filter by'),
});

const schema = z.object({
  prompt: z.string(),
  context: z.string().optional(),
});

export const generateDoctorFilters = authActionClient
  .schema(schema)
  .metadata({ actionName: 'generate-doctor-filters' })
  .action(async ({ parsedInput: { prompt, context } }) => {
    const stream = createStreamableValue();

    (async () => {
      const { partialObjectStream } = await streamObject({
        model: anthropic('claude-3-sonnet-20240229'),
        system: `You are a helpful assistant that generates filters for a given prompt. \n
        Current date is: ${new Date().toISOString().split('T')[0]} \n
        ${context}
      `,
        schema: filterDoctorsSchema,
        prompt,
        temperature: 0.5,
      });
      for await (const data of partialObjectStream) {
        stream.update(data);
      }
      stream.done();
    })();

    return { object: stream.value };
  });
