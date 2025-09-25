import { createDeepSeek } from '@ai-sdk/deepseek';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { createVoyage } from 'voyage-ai-provider';
import { keys } from './keys';
const env = keys();

const deepseek = createDeepSeek({
  apiKey: env.DEEPSEEK_API_KEY,
});

const voyage = createVoyage({
  apiKey: env.VOYAGE_API_KEY,
});

const google = createGoogleGenerativeAI({
  apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY,
});

const openai = createOpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export { deepseek, google, openai, voyage };
