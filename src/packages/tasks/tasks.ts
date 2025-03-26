export const TASK_NAMES = {
  UPDATE_DOCTOR_VECTOR: 'update-doctor-vector',
  CREATE_APPOINTMENT_CALL_ROOM: 'create-appointment-call-room',
  START_APPOINTMENT: 'start-appointment',
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
  {
    taskId: TASK_NAMES.START_APPOINTMENT,
    events: ['user-entered-appointment'],
  },
];

type EventConfig = {
  taskId: string;
  events: string[];
};
