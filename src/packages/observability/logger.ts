import { log } from '@logtail/next';

export const logger = process.env.NODE_ENV === 'production' ? log : console;
