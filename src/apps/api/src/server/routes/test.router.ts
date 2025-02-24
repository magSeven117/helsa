import { Hono } from 'hono';

const router = new Hono();

router.get('/', async (c) => {
  return c.json({ message: 'Hello, World!' });
});

export default router;
