'use client';

import { getChat } from '@/src/actions/chat/get-chat';
import Chat from '@/src/components/chat';
import { useChat } from '@ai-sdk/react';
import { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useLocalStorage } from 'usehooks-ts';
import { v4 } from 'uuid';
import { convertToUIMessages } from '../chat/utils';
import { AssistantFeedback } from './feedback';
import { Header } from './header';
import { SidebarList } from './sidebar-list';

const Assistant = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [chatId, setChatId] = useState<string>();
  const [user] = useLocalStorage('user', null);
  const [initialMessages, setInitialMessages] = useState<any[]>([]);

  const { messages, input, setInput, handleSubmit, setMessages } = useChat({
    initialMessages,
    body: {
      chatId,
      user,
    },
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
    async function fetchData() {
      if (!chatId) return;
      const result = await getChat(chatId);

      if (result) {
        const retrivedMessages = convertToUIMessages(result.messages as any[]);
        setMessages(retrivedMessages);
        setInitialMessages(retrivedMessages);
      }
    }

    fetchData();
  }, [chatId]);
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
