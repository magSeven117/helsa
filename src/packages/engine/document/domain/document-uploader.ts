export interface DocumentUploader {
  upload(file: File, patientId: string, documentType: string): Promise<string>;
}
