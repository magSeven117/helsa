import { StreamClient } from '@stream-io/node-sdk';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id') as string;
  const client = new StreamClient(
    process.env.NEXT_PUBLIC_STREAM_CLIENT_KEY!,
    process.env.NEXT_PUBLIC_STREAM_CLIENT_SECRET!,
  );
  const call = client.video.call('appointment', id);

  const transcriptions = await call.listTranscriptions();

  return NextResponse.json({ success: true, transcriptions: JSON.parse(JSON.stringify(transcriptions)) });
};
