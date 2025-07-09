import { client } from '@helsa/cache/cache';
import { HttpNextResponse } from '@helsa/controller/http-next-response';
import { routeHandler } from '@helsa/controller/route-handler';
import { RedisChatRepository } from '@helsa/engine/chat/infrastructure/redis-chat-repository';
import { NextRequest } from 'next/server';
import { helsaAssistant } from './agents/doctor';
import { helsaTherapist } from './agents/patient';

export async function POST(request: NextRequest) {
  const { messages, chatId, user } = await request.json();
  if (user.role === 'PATIENT') {
    return helsaTherapist(messages, user, chatId);
  } else if (user.role === 'DOCTOR') {
    return helsaAssistant(messages, user, chatId);
  }
}

export const GET = routeHandler({ name: 'get-chats' }, async ({ user }) => {
  if (!user) {
    return HttpNextResponse.error('Unauthorized');
  }
  const repository = new RedisChatRepository(client);
  const chats = await repository.getChats(user.id.value);
  return HttpNextResponse.json({ data: chats });
});

export const DELETE = routeHandler({ name: 'clear-chats' }, async ({ user }) => {
  if (!user) {
    return HttpNextResponse.error('Unauthorized');
  }
  const repository = new RedisChatRepository(client);
  await repository.clearChats(user.id.value);
  return HttpNextResponse.ok();
});
