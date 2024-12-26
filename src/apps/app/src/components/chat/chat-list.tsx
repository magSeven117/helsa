'use client';

import { ClientMessage } from '@/src/actions/chat/types';
import { cn } from '@helsa/ui/lib/utils';

type Props = {
  messages: ClientMessage[];
  className?: string;
};

export function ChatList({ messages, className }: Props) {
  if (!messages.length) {
    return null;
  }

  return (
    <div className={cn('flex flex-col select-text', className)}>
      {messages
        .filter((tool) => tool.display !== undefined)
        .map((message, index) => (
          <div key={message.id}>
            {message.display}
            {index < messages.length - 1 && <div className="my-6" />}
          </div>
        ))}
    </div>
  );
}
