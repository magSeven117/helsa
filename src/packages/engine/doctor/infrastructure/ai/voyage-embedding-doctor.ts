import { embed } from 'ai';
import { voyage } from 'voyage-ai-provider';
import { Appointment } from '../../../appointment/domain/appointment';
import { User } from '../../../user/domain/user';
import { Doctor } from '../../domain/doctor';

export class VoyageEmbeddingDoctor {
  async embed(doctor: Doctor, user: User, appointments: Record<string, Appointment[]>): Promise<number[]> {
    const doctorText = this.text(doctor, user, appointments);
    const doctorEmbedding = await this.embeddings(doctorText);
    return doctorEmbedding;
  }
  async embeddings(text: string) {
    const { embedding } = await embed({
      model: voyage.textEmbeddingModel('voyage-3'),
      value: text,
    });
    return embedding;
  }
  text(doctor: Doctor, user: User, appointments: Record<string, Appointment[]>): string {
    return `
      Dr. ${user.name.value} is a ${doctor.specialty?.name.value} doctor.
      with a consulting score of ${doctor.score.value}.
      and ${doctor.experience.value} years of experience.
      have a look at his schedule:
      ${doctor.schedule?.days.map((day) => {
        return `
          ${day.day.value}: ${day.hours.length}
        `;
      })}
      and his address is ${doctor.consultingRoomAddress?.address.value}.
      and has appointments on:
      ${Object.keys(appointments).map((date) => {
        return `
          ${date}: ${appointments[date]!.length}
        `;
      })}
    `;
  }
}
