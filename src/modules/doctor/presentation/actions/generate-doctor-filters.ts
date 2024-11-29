'use server';
import { anthropic } from '@ai-sdk/anthropic';
import { streamObject } from 'ai';
import { createStreamableValue } from 'ai/rsc';
import { filterDoctorsSchema } from './schema';

const VALID_FILTERS = ['name', 'availability', 'specialties', 'minRate', 'experience'];

export async function generateDoctorFilters(prompt: string, context?: string) {
  const stream = createStreamableValue();

  (async () => {
    const { partialObjectStream } = await streamObject({
      model: anthropic('claude-3-5-sonnet-20240620'),
      system: `You are a helpful assistant that generates filters for a given prompt. \n
        Current date is: ${new Date().toISOString().split('T')[0]} \n
        ${context}
      `,
      schema: filterDoctorsSchema.pick({
        ...(VALID_FILTERS.reduce((acc: any, filter: string) => {
          acc[filter] = true;
          return acc;
        }, {}) as any),
      }),
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
