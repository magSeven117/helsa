import { env } from '@helsa/env';
import { createBrowserClient } from '@supabase/ssr';
import { Database } from './types';

export const createClient = () =>
  createBrowserClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL!, env.NEXT_PUBLIC_SUPABASE_KEY!);

export { RealtimeChannel } from '@supabase/supabase-js';
