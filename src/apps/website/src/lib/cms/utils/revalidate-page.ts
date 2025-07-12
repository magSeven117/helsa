import type { Payload } from 'payload';

import { revalidate } from './revalidate';

export const revalidatePage = async ({
  doc,
  collection,
  payload,
}: {
  doc: any;
  collection: string;
  payload: Payload;
}): Promise<void> => {
  revalidate({ payload, collection, slug: doc.slug });
};
