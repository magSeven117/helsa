import { helsaAssistant } from '@helsa/ai/agents/doctor';
import { helsaTherapist } from '@helsa/ai/agents/patient';
import { RedisChatRepository } from '@helsa/engine/chat/infrastructure/redis-chat-repository';
import { client } from '@helsa/upstash/cache';
import { NextRequest, NextResponse } from 'next/server';
import { routeHandler } from '../route-handler';

export async function POST(request: NextRequest) {
  const { messages, chatId, user } = await request.json();
  if (user.role === 'PATIENT') {
    return helsaTherapist(messages, user, chatId);
  } else if (user.role === 'DOCTOR') {
    return helsaAssistant(messages, user, chatId);
  }
}

export const GET = routeHandler(async ({ user }) => {
  const repository = new RedisChatRepository(client);
  const chats = await repository.getChats(user.id);
  return NextResponse.json({
    message: 'Ok',
    data: chats,
  });
});

export const DELETE = routeHandler(async ({ user }) => {
  const repository = new RedisChatRepository(client);
  await repository.clearChats(user.id);
  return NextResponse.json({
    message: 'Ok',
    data: null,
  });
});
