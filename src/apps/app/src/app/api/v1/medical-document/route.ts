import { database } from '@helsa/database';
import { UploadDocument } from '@helsa/engine/document/application/upload-document';
import { PrismaDocumentRepository } from '@helsa/engine/document/infrastructure/prisma-document-repository';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { withUser } from '../withUser';

const schema = z.object({
  url: z.string(),
  description: z.string(),
  patientId: z.string(),
  appointmentId: z.string(),
  documentType: z.string(),
  filename: z.string(),
});

export const POST = withUser(async ({ req, user }) => {
  const parsedInput = schema.parse(await req.json());
  const service = new UploadDocument(new PrismaDocumentRepository(database));
  await service.run(parsedInput);
  revalidatePath(`/appointments/${parsedInput.appointmentId}`);
  return NextResponse.json(
    {
      message: 'Document uploaded successfully',
    },
    { status: 201 },
  );
});
