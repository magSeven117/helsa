export const TASK_NAMES = {
  UPDATE_DOCTOR_VECTOR: 'update-doctor-vector',
  CREATE_APPOINTMENT_CALL_ROOM: 'create-appointment-call-room',
};
export const handlers: EventConfig[] = [
  {
    taskId: TASK_NAMES.UPDATE_DOCTOR_VECTOR,
    events: ['schedule-registered', 'doctor-created', 'doctor-updated', 'appointment-scheduled'],
  },
  {
    taskId: TASK_NAMES.CREATE_APPOINTMENT_CALL_ROOM,
    events: ['appointment-scheduled'],
  },
];

type EventConfig = {
  taskId: string;
  events: string[];
};
