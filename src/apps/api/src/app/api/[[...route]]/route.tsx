import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';
import { handle } from 'hono/vercel';

import appointmentRoute from '@/src/server/routes/appointment';

export const runtime = 'nodejs';

const app = new OpenAPIHono().basePath('/api');

app.get(
  '/',
  swaggerUI({
    url: '/api/doc',
  })
);

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Helsa API',
  },
});

app.route('/test', appointmentRoute);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
