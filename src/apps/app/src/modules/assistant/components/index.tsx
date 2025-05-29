'use client';

import Chat from '@/src/modules/chat/components';
import { useChat } from '@ai-sdk/react';
import { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { v4 } from 'uuid';
import { useSession } from '../../auth/components/session-provider';
import { convertToUIMessages } from '../../chat/components/utils';
import { useOneChat } from '../hooks/use-chats';
import { AssistantFeedback } from './feedback';
import { Header } from './header';
import { SidebarList } from './sidebar-list';

const Assistant = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [chatId, setChatId] = useState<string>();
  const { user } = useSession();
  const [initialMessages, setInitialMessages] = useState<any[]>([]);
  const { chat } = useOneChat(chatId);

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
