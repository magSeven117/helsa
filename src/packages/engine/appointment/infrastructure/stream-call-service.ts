import { Primitives } from '@helsa/ddd/types/primitives';
import { StreamClient } from '@stream-io/node-sdk';
import { Doctor } from '../../doctor/domain/doctor';
import { Patient } from '../../patient/domain/patient';
import { CallService } from '../domain/call-service';

export class StreamCallService implements CallService {
  constructor(private client: StreamClient) {}

  async createRoom(appointmentId: string, doctor: Primitives<Doctor>, patient: Primitives<Patient>): Promise<void> {
    await this.client.upsertUsers([
      { id: doctor.id, role: 'doctor', name: doctor.user?.name ?? '', image: doctor.user?.image ?? '' },
      { id: patient.id, role: 'patient', name: patient.user?.name ?? '', image: patient.user?.image ?? '' },
    ]);
    const call = this.client.video.call('appointment', appointmentId);
    await call.create({
      data: {
        members: [{ user_id: doctor.id }, { user_id: patient.id }],
      },
    });
  }
}
