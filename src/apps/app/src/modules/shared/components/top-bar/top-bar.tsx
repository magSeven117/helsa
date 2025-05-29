'use client';

import { Sparkles } from 'lucide-react';
import { useAssistantStore } from '../../../assistant/store/assistant-store';
import { SidebarTrigger } from '../side-bar/sidabar-trigger';

const TopBar = () => {
  return (
    <div className="flex w-full justify-between items-center pl-8  pr-8 py-5">
      <div className="flex w-1/2 items-center gap-5">
        <div className="justify-center items-center hidden max-sm:flex">
          <SidebarTrigger />
        </div>
        <AIButton />
      </div>
    </div>
  );
};

export default TopBar;

const AIButton = () => {
  const { setOpen } = useAssistantStore();
  return (
    <div
      className="flex justify-start items-center gap-3 text-muted-foreground hover:text-foreground cursor-pointer text-sm"
      onClick={() => setOpen()}
    >
      <span className="p-1 flex justify-center items-center rounded-none text-xs">
        <Sparkles className="size-4 mr-2" /> Preguntale a Helsa
      </span>
    </div>
  );
};
