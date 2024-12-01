import { ourFileRouter } from '@/modules/shared/infrastructure/files/uploadthing';
import { createRouteHandler } from 'uploadthing/next';
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
