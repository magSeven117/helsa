export const stateLabel: Record<string, { label: string; color: string }> = {
  SCHEDULED: {
    label: 'Agendada',
    color: 'var(--border)',
  },
  CONFIRMED: {
    label: 'Confirmada',
    color: '#0043ce',
  },
  PAYED: {
    label: 'Pagada',
    color: '#8167ec',
  },
  READY: {
    label: 'Lista',
    color: '#22a094',
  },
  STARTED: {
    label: 'Iniciada',
    color: '#22a094',
  },
  MISSED: {
    label: 'Perdida',
    color: '#f1b603',
  },
  CANCELLED: {
    label: 'Cancelada',
    color: '#ea3a3d',
  },
  FINISHED: {
    label: 'Finalizada',
    color: '#673AB7',
  },
};
