import { NextRequest } from 'next/server';
import { HttpNextResponse } from '@helsa/api/http-next-response';
import { getSession } from '@helsa/auth/server';
import { env } from '@/env';

// POST /api/deepgram/token
// Retorna la API key de Deepgram para uso directo
export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return HttpNextResponse.error('Unauthenticated');
    }

    const deepgramSecret = env.DEEPGRAM_SECRET;
    if (!deepgramSecret) {
      console.error('DEEPGRAM_SECRET not configured');
      return HttpNextResponse.error('Deepgram not configured');
    }

    // Para streaming en vivo, usamos directamente la API key
    return HttpNextResponse.json({ 
      token: deepgramSecret,
      expiresIn: null // No expira
    });
  } catch (error) {
    console.error('Error in Deepgram token endpoint:', error);
    return HttpNextResponse.internalServerError(error instanceof Error ? error : undefined);
  }
}

