import { Inngest } from 'inngest';
import { keys } from './keys';

const { INNGEST_SIGNING_KEY, INNGEST_EVENT_KEY } = keys();

export const client = new Inngest({
  id: 'helsa',
  signingKey: INNGEST_SIGNING_KEY,
  eventKey: INNGEST_EVENT_KEY,
});
