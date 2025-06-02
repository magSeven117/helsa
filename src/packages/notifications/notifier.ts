import { Notifier } from '@helsa/ddd/core/notifier';
import { novu } from '.';
export class NovuNotifier implements Notifier {
  async notify(
    event: string,
    user: {
      id: string;
      email?: string;
    },
    data?: any,
  ): Promise<void> {
    await novu.trigger({
      workflowId: event,
      to: {
        subscriberId: user.id,
        email: user.email,
      },
      payload: data,
    });
  }
}
