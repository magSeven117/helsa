import { createBrowserClient } from '@supabase/ssr';
import { keys } from './keys';
import { Database } from './types';
const env = keys();

export const createClient = () =>
  createBrowserClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL!, env.NEXT_PUBLIC_SUPABASE_KEY!);

export { RealtimeChannel } from '@supabase/supabase-js';
