import { helsaAssistant } from '@helsa/ai/agents/doctor';
import { helsaTherapist } from '@helsa/ai/agents/patient';
import { HttpNextResponse } from '@helsa/controller/http-next-response';
import { routeHandler } from '@helsa/controller/route-handler';
import { RedisChatRepository } from '@helsa/engine/chat/infrastructure/redis-chat-repository';
import { client } from '@helsa/upstash/cache';
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
  const repository = new RedisChatRepository(client);
  const chats = await repository.getChats(user.id);
  return HttpNextResponse.json({ data: chats });
});

export const DELETE = routeHandler({ name: 'clear-chats' }, async ({ user }) => {
  const repository = new RedisChatRepository(client);
  await repository.clearChats(user.id);
  return HttpNextResponse.ok();
});
