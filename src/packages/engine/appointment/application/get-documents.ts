import { AppointmentRepository } from '../domain/appointment-repository';

export class GetDocuments {
  constructor(private readonly repository: AppointmentRepository) {}

  async run(appointmentId: string) {
    const documents = await this.repository.getAppointmentDocuments(appointmentId);

    return documents.map((document) => document.toPrimitives());
  }
}
