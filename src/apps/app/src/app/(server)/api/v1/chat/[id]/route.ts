import { RedisChatRepository } from '@helsa/engine/chat/infrastructure/redis-chat-repository';
import { client } from '@helsa/upstash/cache';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const repository = new RedisChatRepository(client);
  const chat = await repository.getChat(id);
  if (!chat) {
    return NextResponse.json(
      {
        message: 'Chat not found',
        data: null,
      },
      { status: 404 },
    );
  }
  return NextResponse.json({
    message: 'Ok',
    data: chat,
  });
};
