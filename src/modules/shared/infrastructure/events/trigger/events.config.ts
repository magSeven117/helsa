import { UpdateDoctorVectorTask } from '@/app/(server)/tasks/update-doctor-vector';
export const handlers: EventConfig[] = [
  {
    taskId: UpdateDoctorVectorTask.id,
    events: ['schedule-registered', 'doctor-created', 'doctor-updated', 'appointment-scheduled'],
  },
];

type EventConfig = {
  taskId: string;
  events: string[];
};
