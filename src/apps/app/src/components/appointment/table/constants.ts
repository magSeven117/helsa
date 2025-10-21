export const stateLabel: Record<string, { label: string; color: string }> = {
  SCHEDULED: {
    label: 'Agendada',
    color: '#FFB703',
  },
  CONFIRMED: {
    label: 'Confirmada',
    color: '#023047',
  },
  PAYED: {
    label: 'Pagada',
    color: '#4CAF50',
  },
  READY: {
    label: 'Lista',
    color: '#4CAF50',
  },
  STARTED: {
    label: 'Iniciada',
    color: '#4CAF50',
  },
  MISSED: {
    label: 'Perdida',
    color: '#FFB703',
  },
  MISSED_BY_PATIENT: {
    label: 'Perdida por paciente',
    color: '#FFB703',
  },
  CANCELLED: {
    label: 'Cancelada',
    color: '#ea3a3d',
  },
  FINISHED: {
    label: 'Finalizada',
    color: '#023047',
  },
};
