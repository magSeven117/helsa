import { NextRequest } from 'next/server';
import { HttpNextResponse } from '@helsa/api/http-next-response';
import { getSession } from '@helsa/auth/server';
import { client as streamClient } from '@helsa/video';

// GET /api/functions/get-transcription?id=<appointmentId>
export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return HttpNextResponse.error('Unauthenticated');
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    console.log('Transcription endpoint - ID received:', id);
    console.log('Transcription endpoint - Full URL:', req.url);
    
    if (!id) {
      return HttpNextResponse.error('Missing id parameter');
    }

    try {
      const call = streamClient.video.call('default', id);
      // En algunas versiones, las transcripciones se exponen como assets del call
      // @ts-expect-error dependiente de versión del SDK
      const assets = (await (call.listAssets?.({ types: ['transcription'] }) || call.queryAssets?.({ types: ['transcription'] }))) || { assets: [] };

      const items = Array.isArray(assets)
        ? assets
        : Array.isArray(assets.assets)
        ? assets.assets
        : [];

      const mapped = items
        .map((a: any) => ({
          url: a?.url || a?.file_url || a?.location || '',
          start_time: a?.start_time || a?.created_at || '',
        }))
        .filter((t: { url: string }) => !!t.url);

      return HttpNextResponse.json({ transcriptions: mapped });
    } catch {
      // Si la cuenta/plan no habilita transcripciones o el SDK no expone el método
      return HttpNextResponse.json({ transcriptions: [] });
    }
  } catch (error) {
    return HttpNextResponse.internalServerError(error instanceof Error ? error : undefined);
  }
}


