import { render } from '@react-email/render';
import { Resend } from 'resend';
import { keys } from './keys';

export const resend = new Resend(keys().RESEND_API_KEY);

export { render };
