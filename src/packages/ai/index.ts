import { createDeepSeek } from '@ai-sdk/deepseek';
import { createVoyage } from 'voyage-ai-provider';
import { keys } from './keys';
const env = keys();

const deepseek = createDeepSeek({
  apiKey: env.DEEPSEEK_API_KEY,
});

const voyage = createVoyage({
  apiKey: env.VOYAGE_API_KEY,
});

export { deepseek, voyage };
