'use client';

import { useSession } from '@/src/components/auth/session-provider';
import Chat from '@/src/components/chat';
import { convertToUIMessages } from '@/src/components/chat/utils';
import { useChat } from '@ai-sdk/react';
import { getChat } from '@helsa/engine/chat/infrastructure/http-chat-api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { v4 } from 'uuid';
import { AssistantFeedback } from './feedback';
import { Header } from './header';
import { SidebarList } from './sidebar-list';

const Assistant = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [chatId, setChatId] = useState<string>();
  const { user } = useSession();
  const [initialMessages, setInitialMessages] = useState<any[]>([]);
  const { data: chat } = useQuery({
    queryKey: ['chats', chatId],
    queryFn: async () => getChat(chatId),
    initialData: null,
    enabled: () => !!chatId,
    refetchOnWindowFocus: false,
  });

  const { messages, input, setInput, handleSubmit, setMessages } = useChat({
    initialMessages,
    body: {
      chatId,
      user,
    },
    api: '/api/v1/chat',
  });

  const toggleOpen = () => setExpanded((prev) => !prev);

  const onNewChat = () => {
    const newChatId = v4();
    setInput('');
    setExpanded(false);
    setMessages([]);
    setChatId(newChatId);
  };

  const handleOnSelect = (id: string) => {
    setExpanded(false);
    setChatId(id);
  };

  useHotkeys('meta+l', () => onNewChat(), {
    enableOnFormTags: true,
  });

  useEffect(() => {
    if (chat) {
      const retrivedMessages = convertToUIMessages(chat.messages as any[]);
      setMessages(retrivedMessages);
      setInitialMessages(retrivedMessages);
    }
  }, [chat]);
  return (
    <div className="overflow-hidden p-0 h-full w-full">
      {showFeedback && <AssistantFeedback onClose={() => setShowFeedback(false)} />}
      <SidebarList
        onNewChat={onNewChat}
        isExpanded={isExpanded}
        setExpanded={setExpanded}
        onSelect={handleOnSelect}
        chatId={chatId}
      />
      <Header toggleSidebar={toggleOpen} isExpanded={isExpanded} />
      <Chat
        handleSubmit={handleSubmit}
        messages={messages}
        user={user}
        onNewChat={onNewChat}
        setInput={setInput}
        input={input}
        showFeedback={() => setShowFeedback(true)}
        chatId={chatId}
        setChatId={setChatId}
      />
    </div>
  );
};

export default Assistant;
