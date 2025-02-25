'use client';

import { cn } from '@helsa/ui/lib/utils';
import { UIMessage } from 'ai';
import { BotMessage, SpinnerMessage, UserMessage } from './messages';
import AvgVitals from './tools/avg-vitals';
import { UpcomingAppointments } from './tools/upcoming-appointments';

type Props = {
  messages: UIMessage[];
  className?: string;
};

export function ChatList({ messages, className }: Props) {
  if (!messages.length) {
    return null;
  }

  return (
    <div className={cn('flex flex-col select-text gap-2', className)}>
      {messages.map((message) => (
        <div key={message.id} className="mb-2">
          {message.role === 'user' && <UserMessage>{message.content}</UserMessage>}
          {message.role === 'assistant' && (!message.toolInvocations || message.toolInvocations.length <= 0) && (
            <BotMessage content={message.content} />
          )}
          {message.role === 'assistant' && message.toolInvocations?.length! > 0 && (
            <div>
              {message.toolInvocations?.map((toolInvocation) => {
                if (toolInvocation.state !== 'result') {
                  return <SpinnerMessage key={toolInvocation.toolCallId} />;
                }
                switch (toolInvocation.toolName) {
                  case 'getUpcomingAppointment': {
                    return (
                      <UpcomingAppointments data={toolInvocation.result.appointments} key={toolInvocation.toolCallId} />
                    );
                  }
                  case 'getAvgVitalsTool': {
                    return <AvgVitals vitals={toolInvocation.result.vitals} />;
                  }
                  default:
                    return null;
                }
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
