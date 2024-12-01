import { UpdateDoctorVectorTask } from '@/app/tasks/update-doctor-vector';
export const handlers: EventConfig[] = [
  {
    taskId: UpdateDoctorVectorTask.id,
    events: ['schedule-registered'],
  },
];

type EventConfig = {
  taskId: string;
  events: string[];
};
