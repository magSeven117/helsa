import { createStreamableValue } from 'ai/rsc';
import { v4 } from 'uuid';
import { BotMessage } from '../messages';

export const generateText = (
  aiState: any,
  textStream: undefined | ReturnType<typeof createStreamableValue<string>>,
  textNode: undefined | React.ReactNode
) => {
  return ({ content, done, delta }: { content: string; done: boolean; delta: string }) => {
    if (!textStream) {
      textStream = createStreamableValue('');
      textNode = <BotMessage content={textStream.value} />;
    }

    if (done) {
      textStream.done();
      aiState.done({
        ...aiState.get(),
        messages: [
          ...aiState.get().messages,
          {
            id: v4(),
            role: 'assistant',
            content,
          },
        ],
      });
    } else {
      textStream.update(delta);
    }
    return textNode;
  };
};
