import { HttpNextResponse } from '@helsa/api/http-next-response';
import { routeHandler } from '@helsa/api/route-handler';
import { transcriptionAnalysisService, TranscriptionData } from '@helsa/ai/transcription-analysis';
import { z } from 'zod';

const analyzeSchema = z.object({
  transcriptions: z.array(z.object({
    text: z.string(),
    timestamp: z.string(),
    speaker: z.string().optional(),
  })),
  appointmentId: z.string(),
});

const realTimeSchema = z.object({
  transcription: z.object({
    text: z.string(),
    timestamp: z.string(),
    speaker: z.string().optional(),
  }),
  appointmentId: z.string(),
});

export const POST = routeHandler(
  { 
    name: 'analyze-transcription',
    schema: analyzeSchema,
  },
  async ({ body }) => {
    const { transcriptions, appointmentId } = body;
    
    const analysis = await transcriptionAnalysisService.analyzeTranscription(transcriptions);
    
    return HttpNextResponse.json({ 
      data: {
        analysis,
        appointmentId,
        timestamp: new Date().toISOString(),
      }
    });
  },
  (error) => {
    console.error('Error analyzing transcription:', error);
    return HttpNextResponse.internalServerError();
  }
);

export const PUT = routeHandler(
  { 
    name: 'analyze-real-time',
    schema: realTimeSchema,
  },
  async ({ body }) => {
    const { transcription, appointmentId } = body;
    
    const analysis = await transcriptionAnalysisService.analyzeRealTime(transcription);
    
    return HttpNextResponse.json({ 
      data: {
        analysis,
        appointmentId,
        timestamp: new Date().toISOString(),
      }
    });
  },
  (error) => {
    console.error('Error in real-time analysis:', error);
    return HttpNextResponse.internalServerError();
  }
);
