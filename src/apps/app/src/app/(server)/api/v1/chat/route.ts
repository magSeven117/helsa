import { helsaAssistant } from '@/src/agents/doctor';
import { helsaTherapist } from '@/src/agents/patient';
import { HttpNextResponse } from '@helsa/api/http-next-response';
import { routeHandler } from '@helsa/api/route-handler';
import { client } from '@helsa/cache/cache';
import { RedisChatRepository } from '@helsa/engine/chat/infrastructure/redis-chat-repository';
import { NextRequest } from 'next/server';

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
