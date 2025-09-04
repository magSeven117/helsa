import { Primitives } from '@helsa/ddd/types/primitives';
import { Doctor } from '@helsa/engine/doctor/domain/doctor';
import { Patient } from '@helsa/engine/patient/domain/patient';
import { CallService } from '@helsa/engine/appointment/domain/call-service';
import { DailyClient } from './daily-client';

export class DailyCallService implements CallService {
  constructor(private dailyClient: DailyClient) {}

  async createRoom(
    appointmentId: string,
    doctor: Primitives<Doctor>,
    patient: Primitives<Patient>,
    date: Date,
  ): Promise<void> {
    // Crear sala en Daily.co
    const room = await this.dailyClient.createRoom(appointmentId, {
      name: `appointment-${appointmentId}`,
      privacy: 'private',
      properties: {
        doctorId: doctor.id,
        patientId: patient.id,
        appointmentDate: date.toISOString(),
        type: 'medical-consultation',
        doctorName: doctor.user?.name ?? '',
        patientName: patient.user?.name ?? '',
      },
    });

    // Crear tokens para doctor y paciente
    const doctorToken = await this.dailyClient.createToken(room.name, doctor.id, {
      isOwner: true,
      exp: Math.floor(date.getTime() / 1000) + 7200, // 2 horas
    });

    const patientToken = await this.dailyClient.createToken(room.name, patient.id, {
      isOwner: false,
      exp: Math.floor(date.getTime() / 1000) + 7200, // 2 horas
    });

    // Log para debugging (en producción podrías guardar estos tokens en BD)
    console.log('Daily.co Room created:', room.name);
    console.log('Doctor token:', doctorToken.token);
    console.log('Patient token:', patientToken.token);
  }

  async endRoom(appointmentId: string): Promise<void> {
    const roomName = `appointment-${appointmentId}`;
    await this.dailyClient.endRoom(roomName);
  }

  // Métodos adicionales específicos de Daily.co
  async getRoomInfo(appointmentId: string) {
    const roomName = `appointment-${appointmentId}`;
    return await this.dailyClient.getRoom(roomName);
  }

  async getRoomParticipants(appointmentId: string) {
    const roomName = `appointment-${appointmentId}`;
    return await this.dailyClient.getRoomParticipants(roomName);
  }

  async startTranscription(appointmentId: string, language: string = 'es') {
    const roomName = `appointment-${appointmentId}`;
    return await this.dailyClient.startTranscription(roomName, { language });
  }

  async stopTranscription(appointmentId: string) {
    const roomName = `appointment-${appointmentId}`;
    return await this.dailyClient.stopTranscription(roomName);
  }

  async startRecording(appointmentId: string, options?: {
    layout?: 'single-participant' | 'grid' | 'active-speaker';
    maxDuration?: number;
  }) {
    const roomName = `appointment-${appointmentId}`;
    return await this.dailyClient.startRecording(roomName, options);
  }

  async stopRecording(appointmentId: string) {
    const roomName = `appointment-${appointmentId}`;
    return await this.dailyClient.stopRecording(roomName);
  }
}
