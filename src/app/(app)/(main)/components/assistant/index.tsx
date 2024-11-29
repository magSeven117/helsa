'use client';

import { useState } from 'react';
import Chat from '../chat';
import { Header } from './header';
import { SidebarList } from './sidebar-list';

const Assistant = () => {
  const [isExpanded, setExpanded] = useState(false);
  const toggleOpen = () => setExpanded((prev) => !prev);
  return (
    <div className="overflow-hidden p-0 h-full w-full md:max-w-[760px] md:h-[480px]">
      <SidebarList
        onNewChat={() => {}}
        onSelect={() => {}}
        isExpanded={isExpanded}
        setExpanded={setExpanded}
        chatId=""
      />
      <Header toggleSidebar={toggleOpen} isExpanded={isExpanded} />
      <Chat />
    </div>
  );
};

export default Assistant;
