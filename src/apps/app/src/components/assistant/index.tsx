'use client';

import { getChat } from '@/src/actions/chat/get-chat';
import Chat from '@/src/components/chat';
import { ChatAIProvider } from '@/src/components/chat/chat-ai-provider';
import { useAIState, useUIState } from 'ai/rsc';
import { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { v4 } from 'uuid';
import { getUIStateFromAIState } from '../chat/utils';
import { AssistantFeedback } from './feedback';
import { Header } from './header';
import { SidebarList } from './sidebar-list';

const Assistant = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [chatId, setChatId] = useState<string>();
  const [messages, setMessages] = useUIState<typeof ChatAIProvider>();
  const [aiState, setAIState] = useAIState<typeof ChatAIProvider>();
  const [input, setInput] = useState<string | undefined>('');

  const toggleOpen = () => setExpanded((prev) => !prev);

  const onNewChat = () => {
    const newChatId = v4();
    setInput('');
    setExpanded(false);
    setAIState((prev: any) => ({ ...prev, messages: [], chatId: newChatId }));
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
        setAIState((prev: any) => ({ ...prev, messages: result.messages }));
        setMessages(getUIStateFromAIState(result));
      }
    }

    fetchData();
  }, [chatId]);
  return (
    <div className="overflow-hidden p-0 h-full w-full md:max-w-[760px] md:h-[480px]">
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
        submitMessage={setMessages}
        messages={messages}
        user={aiState.user}
        onNewChat={onNewChat}
        setInput={setInput}
        input={input}
        showFeedback={() => setShowFeedback(true)}
      />
    </div>
  );
};

export default Assistant;
