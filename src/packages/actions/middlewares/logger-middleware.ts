import { logger } from '@helsa/observability/logger';
import { createMiddleware } from 'next-safe-action';

export const loggerMiddleware = createMiddleware().define(async ({ next, clientInput, metadata }) => {
  logger.info(`Executing action ${metadata.actionName} with input ${JSON.stringify(clientInput)}`);

  const startTime = performance.now();

  // Here we await the action execution.
  const result = await next();

  const endTime = performance.now();

  logger.info(
    `Executed action ${metadata.actionName} with input ${JSON.stringify(clientInput)} and got result ${
      result.success ? 'success' : `failure ${result.serverError}`
    } in ${endTime - startTime}ms`,
  );

  // And then return the result of the awaited action.
  return result;
});
