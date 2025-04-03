import { base } from '../../server';
import { getAppointment } from './get-appointment';

export const appointment = base.router({ getAppointment });
