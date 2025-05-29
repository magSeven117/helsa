import { supabaseServer } from '@helsa/supabase/server';
import { upload } from '@helsa/supabase/storage';
import { DocumentUploader } from '../domain/document-uploader';
export class SupabaseDocumentUploader implements DocumentUploader {
  async upload(file: File, patientId: string, documentType: string): Promise<string> {
    const supabase = await supabaseServer();
    const res = await upload(supabase, {
      file: file,
      path: [patientId, documentType, file.name],
      bucket: 'medical-documents',
    });
    return res;
  }
}
