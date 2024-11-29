import { ScrollArea } from '@/libs/shadcn-ui/components/scroll-area';
import { Textarea } from '@/libs/shadcn-ui/components/textarea';
import { useState } from 'react';
import { ChatEmpty } from './chat-empty';
import { ChatExamples } from './chat-examples';
import { ChatFooter } from './chat-footer';

const Chat = () => {
  const [input, setInput] = useState('');
  return (
    <div className="relative">
      <ScrollArea className="md:h-[335px]">
        <div>
          <ChatEmpty firstName={'Jose'} />
          <div></div>
        </div>
      </ScrollArea>
      <div className="fixed bottom-[1px] left-[1px] right-[1px] md:h-[88px] bg-background border-border border-t-[1px]">
        <ChatExamples onSubmit={() => {}} />
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
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
            onKeyDown={(e) => console.log(e)}
            onChange={(evt) => {
              setInput(evt.target.value);
            }}
          />
        </form>
        <ChatFooter
          showFeedback={() => {}}
          onSubmit={() => {
            console.log('submit');
          }}
        />
      </div>
    </div>
  );
};

export default Chat;
