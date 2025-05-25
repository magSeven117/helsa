import 'server-only';

import { Redis } from '@upstash/redis';
import { keys } from './keys';
const env = keys();
export const client = new Redis({
  url: env.UPSTASH_REDIS_REST_URL!,
  token: env.UPSTASH_REDIS_REST_TOKEN!,
});

export { Redis } from '@upstash/redis';
