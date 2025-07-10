'use client';
import { useMessages } from '@/src/hooks/use-messages';
import { Button } from '@helsa/ui/components/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@helsa/ui/components/sheet';
import { User } from 'better-auth';
import { formatDistance } from 'date-fns';
import { fromZonedTime, toDate } from 'date-fns-tz';
import { es } from 'date-fns/locale';
import { MessageSquare } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import ChatInput from './input';
const CallCHat = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const [user] = useLocalStorage<User | null>('user', null);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={'outline'} size={'icon'} className="absolute top-5 right-5">
          <MessageSquare />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-1/3 sm:max-w-full p-4 bg-transparent border-none focus-visible:outline-none ">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll space-y-5 rounded-xl flex flex-col justify-between">
          <SheetHeader>
            <SheetTitle>Chat</SheetTitle>
          </SheetHeader>
          <div className="h-full flex flex-col justify-end">
            <ChatList userId={user?.id || ''} appointmentId={id} />
            <ChatFooter userId={user?.id || ''} appointmentId={id} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const ChatFooter = ({ appointmentId, userId }: { appointmentId: string; userId: string }) => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useMessages(appointmentId);
  const handleSend = () => {
    sendMessage({ text: message, userId, appointmentId });
    setMessage('');
  };
  return <ChatInput message={message} setMessage={setMessage} submit={handleSend} />;
};

const ChatList = ({ userId, appointmentId }: { userId: string; appointmentId: string }) => {
  const { messages } = useMessages(appointmentId);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo(0, ref.current.scrollHeight);
  }, [messages]);
  return (
    <div className="flex-auto h-[50vh] overflow-y-scroll py-2 no-scroll" ref={ref}>
      {messages.length === 0 && (
        <div className="text-center h-full w-full flex justify-center items-center">No messages</div>
      )}
      {messages.map((message, index) => {
        const isUserMessage = message.userId === userId;
        return (
          <div
            key={`message-${index}`}
            className={`py-2 px-2 ${isUserMessage ? 'justify-end' : 'justify-start'} w-full text-sm flex items-center`}
          >
            <div
              className={`p-2 ${
                isUserMessage ? 'bg-stone-600 text-right  justify-end' : 'bg-sidebar text-left'
              } text-sm flex flex-col justify-center rounded-xl`}
            >
              {message.text}
              <span className={`text-xs ${isUserMessage ? '' : 'text-muted-foreground'}`}>
                {formatDistance(
                  toDate(message.createdAt!, { timeZone: 'UTC' }),
                  fromZonedTime(new Date(), Intl.DateTimeFormat().resolvedOptions().timeZone),
                  { addSuffix: false, locale: es },
                )}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const ChatSkeleton = () => {
  return (
    <div className="flex-auto h-[50vh] overflow-y-scroll py-2 no-scroll">
      {[1, 2, 3, 4, 5].map((_, index) => (
        <div key={`skeleton-${index}`} className="py-2 px-2 w-full text-sm flex items-center">
          <div className="p-2 bg-stone-600 text-right justify-end text-sm flex flex-col rounded-none">
            <div className="animate-pulse bg-stone-600 h-5 w-1/2 rounded-none"></div>
            <div className="animate-pulse bg-stone-600 h-3 w-1/4 rounded-none"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CallCHat;
