'use server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { keys } from './keys';
import { Database } from './types';
const env = keys();

export const supabaseServer = async () => {
  const cookieStore = await cookies();

  return createServerClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL!, env.NEXT_PUBLIC_SUPABASE_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
    },
  });
};
