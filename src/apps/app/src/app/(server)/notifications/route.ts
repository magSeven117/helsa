import { serve } from '@novu/framework/next';
import { appointmentCreatedWorkflow } from './workflows/appointment-created';

export const { GET, POST, OPTIONS } = serve({ workflows: [appointmentCreatedWorkflow] });
