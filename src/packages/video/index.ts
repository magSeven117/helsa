import { StreamClient } from '@stream-io/node-sdk';
import { keys } from './keys';
import { DailyClient } from './daily-client';
import { DailyCallService } from './daily-call-service';

const env = keys();

// Cliente Stream.io (implementación actual)
export const streamClient = new StreamClient(env.NEXT_PUBLIC_STREAM_CLIENT_KEY, env.NEXT_PUBLIC_STREAM_CLIENT_SECRET);

// Cliente Daily.co (nueva implementación)
export const dailyClient = new DailyClient();

// Servicio de llamadas con Daily.co
export const dailyCallService = new DailyCallService(dailyClient);

// Exportar también el cliente original para compatibilidad
export const client = streamClient;
