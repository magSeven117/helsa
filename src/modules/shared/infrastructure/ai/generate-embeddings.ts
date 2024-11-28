import { embed } from 'ai';
import { voyage } from 'voyage-ai-provider';

export const generateEmbeddings = async (text: string): Promise<number[]> => {
  const { embedding } = await embed({
    model: voyage.textEmbeddingModel('voyage-3'),
    value: text,
  });
  return embedding;
};
