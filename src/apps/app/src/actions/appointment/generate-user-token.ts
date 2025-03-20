import { authActionClient } from '@helsa/actions';
import { StreamClient } from '@stream-io/node-sdk';

export const generateUserToken = authActionClient
  .metadata({
    actionName: 'generate-user-token',
  })
  .action(async ({ ctx: { user } }) => {
    try {
      const client = new StreamClient(
        process.env.NEXT_PUBLIC_STREAM_CLIENT_KEY!,
        process.env.NEXT_PUBLIC_STREAM_CLIENT_SECRET!,
      );

      await client.upsertUsers([
        {
          id: user.id,
          name: user.name,
          image: user.image ?? '',
          role: user.role === 'PATIENT' ? 'patient' : 'doctor',
        },
      ]);

      const token = client.generateUserToken({
        user_id: user.id,
        validity_in_seconds: 60 * 60 * 24,
      });

      return token;
    } catch (error) {
      console.log(error);
    }
  });
