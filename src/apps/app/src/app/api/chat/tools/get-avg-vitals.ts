import { getAvgVitals } from '@/src/actions/patient/get-avg-vitals';
import { tool } from 'ai';
import { z } from 'zod';

export const getAvgVitalsTool = tool({
  description: 'Get the average vitals values of a patient',
  parameters: z.object({
    currentDate: z.coerce.date().describe('current date in ISO-8601 format').optional(),
  }),
  execute: async (props: any) => {
    const response = await getAvgVitals();
    const vitals = response?.data ?? {
      weight: 0,
      temperature: 0,
      bloodPressure: 0,
      heartRate: 0,
      respiratoryRate: 0,
      oxygenSaturation: 0,
    };
    return {
      vitals,
    };
  },
});
