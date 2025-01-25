'use server';

import { authActionClient } from '@helsa/actions';
import { UploadDocument } from '@helsa/engine/document/application/upload-document';
import { PrismaDocumentRepository } from '@helsa/engine/document/infrastructure/prisma-document-repository';
import { database } from '@helsa/database';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
const schema = z.object({
  url: z.string(),
  description: z.string(),
  patientId: z.string(),
  appointmentId: z.string(),
  documentType: z.string(),
  filename: z.string(),
});

export const uploadDocument = authActionClient
  .schema(schema)
  .metadata({ actionName: 'upload-document' })
  .action(async ({ parsedInput, ctx }) => {
    const service = new UploadDocument(new PrismaDocumentRepository(database));
    await service.run(parsedInput);
    revalidatePath(`/appointments/${parsedInput.appointmentId}`);
  });
