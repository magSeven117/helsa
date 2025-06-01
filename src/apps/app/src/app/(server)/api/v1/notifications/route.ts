import { appointmentCreatedWorkflow } from '@helsa/notifications/workflows/appointment-created';
import { serve } from '@novu/framework/next';

export const { GET, POST, OPTIONS } = serve({ workflows: [appointmentCreatedWorkflow] });
