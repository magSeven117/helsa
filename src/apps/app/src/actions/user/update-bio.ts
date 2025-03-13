'use server';
import { authActionClient } from '@helsa/actions';
import { auth } from '@helsa/auth/server';
import { headers } from 'next/headers';
import { z } from 'zod';

const schema = z.object({
  bio: z.string(),
});

export const updateBio = authActionClient
  .schema(schema)
  .metadata({ actionName: 'update-bio' })
  .action(async ({ parsedInput }) => {
    const { bio } = parsedInput;
    await auth.api.updateUser({ body: { bio }, headers: await headers() });
  });
