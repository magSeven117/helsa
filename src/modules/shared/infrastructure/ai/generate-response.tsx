import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';

export const generateResponse = async (data: string): Promise<string> => {
  const { text } = await generateText({
    model: anthropic('claude-3-sonnet-20240229'),
    prompt: data,
  });

  return text;
};
