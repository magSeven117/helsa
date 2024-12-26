import { authActionClient } from '@helsa/actions';
import * as Ably from 'ably';
export const generateChatToken = authActionClient
  .metadata({
    actionName: 'generate-chat-token',
  })
  .action(async ({ ctx: { user } }) => {
    const ably = new Ably.Realtime({ key: process.env.ABLY_API_KEY });
    const token = await ably.auth.createTokenRequest({ clientId: user.id });
    return token;
  });
