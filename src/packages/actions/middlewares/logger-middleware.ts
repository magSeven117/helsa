import { logger } from '@helsa/observability/logger';
import { createMiddleware } from 'next-safe-action';

export const loggerMiddleware = createMiddleware().define(async ({ next, clientInput, metadata }) => {
  logger.info(`Executing action ${metadata.actionName} `);

  // Here we await the action execution.
  const result = await next();

  logger.info(
    `Executed action ${metadata.actionName}  and got result ${
      result.success ? 'success' : `failure ${result.serverError}`
    }`,
  );

  // And then return the result of the awaited action.
  return result;
});
