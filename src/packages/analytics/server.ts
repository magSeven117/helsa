import { keys } from './keys';
const env = keys();
import { OpenPanel, type PostEventPayload } from '@openpanel/nextjs';
import { cookies } from 'next/headers';

type Props = {
  userId?: string;
  fullName?: string | null;
};

export const setupAnalytics = async (options?: Props) => {
  const { userId, fullName } = options ?? {};
  const trackingConsent =
    !(await cookies()).has('tracking-consent') || (await cookies()).get('tracking-consent')?.value === '1';

  const client = new OpenPanel({
    clientId: env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID!,
    clientSecret: env.NEXT_PUBLIC_OPENPANEL_CLIENT_SECRET!,
  });

  if (trackingConsent && userId && fullName) {
    const [firstName, lastName] = fullName.split(' ');

    await client.identify({
      profileId: userId,
      firstName,
      lastName,
    });
  }

  return {
    track: async (options: { event: string } & PostEventPayload['properties']) => {
      if (process.env.NODE_ENV !== 'production') {
        console.log('Track', options);
        return;
      }

      const { event, ...rest } = options;

      await client.track(event, rest);
    },
  };
};
