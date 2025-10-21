import { Primitives } from '@helsa/ddd/types/primitives';
import { StreamClient } from '@stream-io/node-sdk';
import { Doctor } from '../../doctor/domain/doctor';
import { Patient } from '../../patient/domain/patient';
import { CallService } from '../domain/call-service';

export class StreamCallService implements CallService {
  constructor(private client: StreamClient) {}

  async createRoom(
    appointmentId: string,
    doctor: Primitives<Doctor>,
    patient: Primitives<Patient>,
    date: Date,
  ): Promise<void> {
    try {
      console.log('Creating Stream.io users with roles:', {
        doctorId: doctor.id,
        patientId: patient.id,
        doctorRole: 'doctor',
        patientRole: 'patient'
      });
      
      // Use default roles until custom roles are configured in Stream.io dashboard
      await this.client.upsertUsers([
        { 
          id: doctor.id, 
          role: 'user', // Use default role temporarily
          name: doctor.user?.name ?? '', 
          image: doctor.user?.image ?? '' 
        },
        { 
          id: patient.id, 
          role: 'user', // Use default role temporarily
          name: patient.user?.name ?? '', 
          image: patient.user?.image ?? '' 
        },
      ]);
      
      console.log('Users created successfully in Stream.io');
      
      // Use 'default' call type (available types: audio_room, default, development, livestream)
      const call = this.client.video.call('default', appointmentId);
      console.log('Creating call with type "default" and id:', appointmentId);
      await call.create({
        data: {
          members: [{ user_id: doctor.userId }, { user_id: patient.userId }],
          created_by_id: doctor.id,
          starts_at: date,
        },
      });
      
      console.log('Call room created successfully');
    } catch (error) {
      console.error('Error creating Stream.io room:', error);
      throw error;
    }
  }

  async endRoom(appointmentId: string): Promise<void> {
    // Use 'default' call type (available types: audio_room, default, development, livestream)
    const call = this.client.video.call('default', appointmentId);
    await call.end();
  }
}
