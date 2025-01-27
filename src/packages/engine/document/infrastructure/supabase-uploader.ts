import { DocumentUploader } from '../domain/document-uploader';
import { createClient } from '@helsa/supabase/client';
import { upload } from '@helsa/storage';
export class SupabaseDocumentUploader implements DocumentUploader {
  async upload(file: File, patientId: string, documentType: string): Promise<string> {
    const supabase = createClient();
    const res = await upload(supabase, {
      file: file,
      path: [patientId, documentType, file.name],
      bucket: 'medical-documents',
    });
    return res;
  }
}
