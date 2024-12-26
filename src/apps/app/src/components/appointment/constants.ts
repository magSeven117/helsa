export const stateLabel: Record<string, { label: string; color: string }> = {
  SCHEDULED: {
    label: 'Agendada',
    color: '#88C107',
  },
  RESCHEDULED: {
    label: 'Reagendada',
    color: '#FF9800',
  },
  CONFIRMED: {
    label: 'Confirmada',
    color: '#4CAF50',
  },
  LATE: {
    label: 'Tarde',
    color: '#F44336',
  },
  CANCELLED: {
    label: 'Cancelada',
    color: '#9E9E9E',
  },
  WAITING_DOCTOR: {
    label: 'Esperando al doctor',
    color: '#03A9F4',
  },
  WAITING_PATIENT: {
    label: 'Esperando al paciente',
    color: '#00BCD4',
  },
  STARTED: {
    label: 'Iniciada',
    color: '#8BC34A',
  },
  MISSED: {
    label: 'Perdida',
    color: '#E91E63',
  },
  FINISHED: {
    label: 'Finalizada',
    color: '#673AB7',
  },
};
