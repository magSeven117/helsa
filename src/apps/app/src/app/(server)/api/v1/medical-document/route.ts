import { HttpNextResponse } from '@helsa/api/http-next-response';
import { routeHandler } from '@helsa/api/route-handler';
import { database } from '@helsa/database';
import { UploadDocument } from '@helsa/engine/document/application/upload-document';
import { PrismaDocumentRepository } from '@helsa/engine/document/infrastructure/prisma-document-repository';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  url: z.string(),
  description: z.string(),
  patientId: z.string(),
  appointmentId: z.string(),
  documentType: z.string(),
  filename: z.string(),
});

export const POST = routeHandler({ name: 'upload-document', schema }, async ({ body }) => {
  const parsedInput = body;
  const service = new UploadDocument(new PrismaDocumentRepository(database));
  await service.run(parsedInput);
  revalidatePath(`/appointments/${parsedInput.appointmentId}`);
  return HttpNextResponse.ok();
});
