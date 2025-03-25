import { StreamClient } from '@stream-io/node-sdk';
import { keys } from './keys';
const env = keys();

export const client = new StreamClient(env.NEXT_PUBLIC_STREAM_CLIENT_KEY, env.NEXT_PUBLIC_STREAM_CLIENT_SECRET);
