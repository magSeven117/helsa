import { Novu } from '@novu/api';
import { keys } from './keys';

export const novu = new Novu({ secretKey: keys().NOVU_SECRET_KEY });
