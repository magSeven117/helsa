export const TASK_NAMES = {
  UPDATE_DOCTOR_VECTOR: 'update-doctor-vector',
};
export const handlers: EventConfig[] = [
  {
    taskId: TASK_NAMES.UPDATE_DOCTOR_VECTOR,
    events: ['schedule-registered', 'doctor-created', 'doctor-updated', 'appointment-scheduled'],
  },
];

type EventConfig = {
  taskId: string;
  events: string[];
};
