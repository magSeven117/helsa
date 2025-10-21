import { NextRequest } from 'next/server';
import { HttpNextResponse } from '@helsa/api/http-next-response';
import { getSession } from '@helsa/auth/server';

// POST /api/deepgram/save-transcript
// Guarda una transcripción en el backend
export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return HttpNextResponse.error('Unauthenticated');
    }

    const { appointmentId, text, speaker, timestamp, words } = await req.json();

    if (!appointmentId || !text) {
      return HttpNextResponse.error('Missing required fields');
    }

    // TODO: Guardar en la base de datos cuando se implemente el modelo
    // Por ahora solo logueamos
    console.log('Saving transcript:', {
      appointmentId,
      text,
      speaker,
      timestamp,
      wordCount: words?.length || 0,
    });

    // Aquí iría la lógica para guardar en la base de datos:
    // await db.transcription.create({
    //   data: {
    //     appointmentId,
    //     text,
    //     speaker,
    //     timestamp: new Date(timestamp),
    //     words: JSON.stringify(words),
    //   },
    // });

    return HttpNextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving transcript:', error);
    return HttpNextResponse.internalServerError(error instanceof Error ? error : undefined);
  }
}

