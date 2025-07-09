import { Polar } from '@polar-sh/sdk';
import { keys } from './keys';
const env = keys();
const client = new Polar({
  accessToken: env.POLAR_SECRET_KEY,
  server: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
});

export default client;

export { Checkout, CustomerPortal, Webhooks } from '@polar-sh/nextjs';
