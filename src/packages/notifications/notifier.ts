import { Notifier } from '@helsa/ddd/core/notifier';
import { novu } from '.';
export class NovuNotifier implements Notifier {
  async notify(event: string, userId: string, data?: any): Promise<void> {
    await novu.trigger({
      workflowId: event,
      to: {
        subscriberId: userId,
      },
      payload: data,
    });
  }
}
