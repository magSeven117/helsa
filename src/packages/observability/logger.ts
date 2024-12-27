import { env } from '@helsa/env';
import { log } from '@logtail/next';

export const logger = env.NODE_ENV === 'production' ? log : console;
