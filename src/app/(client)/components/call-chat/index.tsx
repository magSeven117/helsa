'use client';
import { Button } from '@/libs/shadcn-ui/components/button';
import { Input } from '@/libs/shadcn-ui/components/input';
import { ChatClient, RoomOptionsDefaults } from '@ably/chat';
import { ChatClientProvider, ChatRoomProvider, useMessages } from '@ably/chat/react';
import * as Ably from 'ably';
import { User } from 'better-auth';
import { formatDistance } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
const CallCHat = ({ id, user }: { id: string; user: User }) => {
  const [client, setClient] = useState<ChatClient | null>(null);
  useEffect(() => {
    const ably = new Ably.Realtime({ key: process.env.NEXT_PUBLIC_ABLY_API_KEY, clientId: user.id });
    setClient(new ChatClient(ably));
  }, []);

  if (!client) {
    return null;
  }

  return (
    <ChatClientProvider client={client}>
      <ChatRoomProvider id={id} options={RoomOptionsDefaults} release={false}>
        <div className="border-b h-8 px-10"></div>
        <ChatList userId={user.id} />
        <ChatFooter />
      </ChatRoomProvider>
    </ChatClientProvider>
  );
};

const ChatFooter = () => {
  const [message, setMessage] = useState('');
  const { send } = useMessages();
  const handleSend = () => {
    send({ text: message });
    setMessage('');
  };
  return (
    <div className="border-t h-16 flex justify-between items-center">
      <Input
        className="h-full border-none rounded-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <Button className="h-full" onClick={handleSend}>
        Enviar
      </Button>
    </div>
  );
};

const ChatList = ({ userId }: { userId: string }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const { get } = useMessages({
    listener: (message) => {
      console.log(message);
      setMessages((prev) => [...prev, message.message]);
    },
  });
  useEffect(() => {
    get({ limit: 50, direction: 'forwards' }).then((messages) => setMessages((prev) => [...messages.items]));
  }, []);

  useEffect(() => {
    ref.current?.scrollTo(0, ref.current.scrollHeight);
  }, [messages]);
  return (
    <div className="h-[500px] overflow-y-scroll py-2 styled-scroll" ref={ref}>
      {messages.length === 0 && (
        <div className="text-center h-full w-full flex justify-center items-center">No messages</div>
      )}
      {messages.map((message, index) => {
        const isUserMessage = message.clientId === userId;
        return (
          <div
            key={`message-${index}`}
            className={`p-2 ${isUserMessage ? 'justify-end' : 'justify-start'} w-full text-sm flex items-center`}
          >
            <div
              className={`p-2 ${
                isUserMessage ? 'bg-gray-400 text-right text-black justify-end' : 'bg-sidebar text-left'
              } rounded-none w-1/2 text-sm flex flex-col justify-center`}
            >
              {message.text}
              <span className={`text-xs ${isUserMessage ? 'text-gray-700' : 'text-muted-foreground'}`}>
                {formatDistance(new Date(message.createdAt), new Date(), { addSuffix: true })}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CallCHat;
