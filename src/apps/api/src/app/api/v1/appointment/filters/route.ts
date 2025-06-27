import { google } from '@helsa/ai';
import { streamObject } from 'ai';
import { isValid } from 'date-fns';
import { NextRequest } from 'next/server';
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

export const POST = async (req: NextRequest) => {
  const { prompt, context } = await req.json();
  console.log(prompt, context);
  const result = streamObject({
    model: google('gemini-2.0-flash'),
    system: `You are a helpful assistant that generates filters for a given prompt. \n
      Current date is: ${new Date().toISOString().split('T')[0]} \n
      ${context}
    `,
    schema: filterDoctorsSchema,
    prompt,
    temperature: 0.5,
  });
  return result.toTextStreamResponse();
};
