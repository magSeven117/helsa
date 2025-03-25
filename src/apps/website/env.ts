import { keys as auth } from '@helsa/auth/keys';
import { keys as cache } from '@helsa/cache/keys';
import { keys as database } from '@helsa/database/keys';
import { keys as emails } from '@helsa/email/keys';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
  extends: [auth(), cache(), database(), emails()],
  server: {},
  client: {},
  runtimeEnv: {},
});
