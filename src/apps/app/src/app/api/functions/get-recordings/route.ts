import { NextRequest } from 'next/server';
import { HttpNextResponse } from '@helsa/api/http-next-response';
import { getSession } from '@helsa/auth/server';
import { client as streamClient } from '@helsa/video';

// GET /api/functions/get-recordings?id=<appointmentId>
export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return HttpNextResponse.error('Unauthenticated');
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return HttpNextResponse.error('Missing id');
    }

    // Intentar consultar grabaciones de la llamada en Stream Video
    // Nota: dependiendo de la versión del SDK, esta API puede variar.
    // Probamos primero vía SDK; si no existe el método, devolvemos [].
    try {
      // Construir call CID estándar: `${type}:${id}` (type usado en el front: 'default')
      const call = streamClient.video.call('default', id);
      // Algunas versiones soportan listRecordings/queryRecordings desde el recurso call
      // @ts-expect-error dependiente de versión del SDK
      const recordings = (await (call.listRecordings?.() || call.queryRecordings?.())) || { recordings: [] };

      const items = Array.isArray(recordings)
        ? recordings
        : Array.isArray(recordings.recordings)
        ? recordings.recordings
        : [];

      const mapped = items
        .map((r: any) => ({ url: r?.url || r?.file_url || r?.location || '' }))
        .filter((r: { url: string }) => !!r.url);

      return HttpNextResponse.json({ recordings: mapped });
    } catch (e) {
      // Si la cuenta/plan no habilita grabaciones o el SDK no expone el método
      return HttpNextResponse.json({ recordings: [] });
    }
  } catch (error) {
    return HttpNextResponse.internalServerError(error instanceof Error ? error : undefined);
  }
}


