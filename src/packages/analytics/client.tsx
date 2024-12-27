import { env } from '@helsa/env';
import { OpenPanelComponent, type PostEventPayload, useOpenPanel } from '@openpanel/nextjs';

const isProd = env.NODE_ENV === 'production';

const Provider = () => (
  <OpenPanelComponent
    clientId={env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID!}
    trackAttributes={true}
    trackScreenViews={isProd}
    trackOutgoingLinks={isProd}
  />
);

const track = (options: { event: string } & PostEventPayload['properties']) => {
  const { track: openTrack } = useOpenPanel();

  if (!isProd) {
    console.log('Track', options);
    return;
  }

  const { event, ...rest } = options;

  openTrack(event, rest);
};

export { Provider, track };
