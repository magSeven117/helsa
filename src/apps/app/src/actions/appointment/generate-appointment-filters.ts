'use server';
import { deepseek } from '@ai-sdk/deepseek';
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
  date: parseDateSchema.optional().describe('The date to filter by. Return ISO-8601 format.'),
  specialties: z.array(z.string()).optional().describe('The medical specialties to filter by'),
  types: z.array(z.string()).optional().describe('The appointment types to filter by'),
  states: z.array(z.string()).optional().describe('The states to filter by'),
});

export async function generateAppointmentFilters(prompt: string, context: string) {
  const stream = createStreamableValue();

  (async () => {
    const { partialObjectStream } = await streamObject({
      model: deepseek('deepseek-chat'),
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
}
