import { Index } from '@upstash/vector';
import { keys } from 'keys';

type Metadata = { genre: string; year: number };

export const doctorIndex = new Index<Metadata>({
  url: keys().UPSTASH_VECTOR_REST_URL,
  token: keys().UPSTASH_VECTOR_REST_TOKEN,
});
