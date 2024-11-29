import { useEnterSubmit } from '@/libs/ducen-ui/hooks/use-enter-submit';
import { useScrollAnchor } from '@/libs/ducen-ui/hooks/use-scroll-anchor';
import { ScrollArea } from '@/libs/shadcn-ui/components/scroll-area';
import { Textarea } from '@/libs/shadcn-ui/components/textarea';
import { useActions } from 'ai/rsc';
import { useEffect, useRef } from 'react';
import { v4 } from 'uuid';
import { useAssistantStore } from '../assistant/assistant-store';
import { ClientMessage } from './actions/types';
import { ChatEmpty } from './chat-empty';
import { ChatExamples } from './chat-examples';
import { ChatFooter } from './chat-footer';
import { ChatList } from './chat-list';
import { UserMessage } from './messages';

const Chat = ({ messages, submitMessage, user, onNewChat, input, setInput, showFeedback }: any) => {
  const { submitUserMessage } = useActions();
  const { formRef, onKeyDown } = useEnterSubmit();
  const ref = useRef(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { message } = useAssistantStore();

  const onSubmit = async (input: string) => {
    const value = input.trim();

    if (value.length === 0) {
      return null;
    }

    setInput('');
    scrollToBottom();

    submitMessage((message: ClientMessage[]) => [
      ...message,
      {
        id: v4(),
        role: 'user',
        display: <UserMessage>{value}</UserMessage>,
      },
    ]);

    const responseMessage = await submitUserMessage(value);

    submitMessage((messages: ClientMessage[]) => [...messages, responseMessage]);
  };

  useEffect(() => {
    if (!ref.current && message) {
      onNewChat();
      onSubmit(message);
      ref.current = true;
    }
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      inputRef?.current?.focus();
    });
  }, [messages]);

  const { messagesRef, scrollRef, visibilityRef, scrollToBottom } = useScrollAnchor();
  const showExamples = messages.length === 0 && !input;

  return (
    <div className="relative">
      <ScrollArea className="md:h-[335px]" ref={scrollRef}>
        <div ref={messagesRef}>
          {messages.length ? (
            <ChatList messages={messages} className="p-4 pb-8" />
          ) : (
            <ChatEmpty firstName={user?.name.split(' ').at(0)} />
          )}
          <div className="w-full h-px" ref={visibilityRef} />
        </div>
      </ScrollArea>
      <div className="fixed bottom-[1px] left-[1px] right-[1px] md:h-[88px] bg-background border-border border-t-[1px]">
        {showExamples && <ChatExamples onSubmit={onSubmit} />}
        <form
          ref={formRef}
          onSubmit={(evt) => {
            onSubmit(input);
          }}
        >
          <Textarea
            tabIndex={0}
            rows={1}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            value={input}
            className="h-12 min-h-12 pt-3 resize-none border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Ask Helsa a question..."
            onKeyDown={onKeyDown}
            onChange={(evt) => {
              setInput(evt.target.value);
            }}
          />
        </form>
        <ChatFooter onSubmit={() => onSubmit(input)} showFeedback={showFeedback} />
      </div>
    </div>
  );
};

export default Chat;
