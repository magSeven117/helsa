'use client';
import { ChatClient, RoomOptionsDefaults } from '@ably/chat';
import { ChatClientProvider, ChatRoomProvider, useMessages, usePresenceListener } from '@ably/chat/react';
import { Button } from '@helsa/ui/components/button';
import { Input } from '@helsa/ui/components/input';
import * as Ably from 'ably';
import { User } from 'better-auth';
import { formatDistance } from 'date-fns';
import { Send } from 'lucide-react';
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
        <div className="h-2"></div>
        <ChatList userId={user.id} />
        <ChatFooter />
      </ChatRoomProvider>
    </ChatClientProvider>
  );
};

const ChatStatus = () => {
  const [present, setPresent] = useState(false);
  const {} = usePresenceListener({
    listener: (presence) => {
      if (presence.action === 'present') {
        setPresent(true);
      } else if (presence.action === 'leave') {
        setPresent(false);
      }
    },
  });
  return (
    <div className="h-8 bg-background border-b">
      <div className="h-full flex justify-center items-center">
        <span className="text-muted-foreground text-sm">Chat</span>
        <span className={`ml-2 size-2 rounded-full ${present ? 'bg-green-500' : 'bg-red-500'}`}></span>
      </div>
    </div>
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
    <div className="h-16 flex justify-between items-center relative px-3 py-2">
      <Input
        className="h-10 border border-primary rounded-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 pr-8 py-0"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Escribe un mensaje..."
      />
      <Button className="size-8 p-0 rounded-none absolute right-4" size={'icon'} onClick={handleSend}>
        <Send className="size-3" />
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
    get({ limit: 50, direction: 'forwards', end: new Date().getTime() }).then((messages) =>
      setMessages((prev) => [...messages.items]),
    );
  }, []);

  useEffect(() => {
    console.log(messages);
    ref.current?.scrollTo(0, ref.current.scrollHeight);
  }, [messages]);
  return (
    <div className="flex-auto h-[50vh] overflow-y-scroll py-2 no-scroll" ref={ref}>
      {messages.length === 0 && (
        <div className="text-center h-full w-full flex justify-center items-center">No messages</div>
      )}
      {messages.map((message, index) => {
        const isUserMessage = message.clientId === userId;
        return (
          <div
            key={`message-${index}`}
            className={`py-2 px-2 ${isUserMessage ? 'justify-end' : 'justify-start'} w-full text-sm flex items-center`}
          >
            <div
              className={`p-2 ${
                isUserMessage ? 'bg-gray-300 text-right text-black justify-end' : 'bg-sidebar text-left'
              } text-sm flex flex-col justify-center rounded-sm`}
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
