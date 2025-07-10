import { appointmentCreatedWorkflow } from '@/src/notifications/appointment-created';
import { serve } from '@novu/framework/next';

export const { GET, POST, OPTIONS } = serve({ workflows: [appointmentCreatedWorkflow] });
