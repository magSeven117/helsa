import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import testRouter from '@/src/server/routes/test.router';

export const runtime = 'nodejs';

const app = new Hono().basePath('/api');

app.route('/test', testRouter);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
