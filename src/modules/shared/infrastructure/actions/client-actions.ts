import { createSafeActionClient } from 'next-safe-action';
import { z } from 'zod';
import { DomainError } from '../../domain/core/domain-error';
import { authMiddleware } from './auth-middleware';
import { loggerMiddleware } from './logger-middleware';
import { rateLimitMiddleware } from './rate-limit-middleware';

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof DomainError) {
      return e.message;
    }
    return 'Internal server error';
  },
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
})
  .use(loggerMiddleware)
  .use(rateLimitMiddleware);

export const authActionClient = actionClient.use(authMiddleware);
