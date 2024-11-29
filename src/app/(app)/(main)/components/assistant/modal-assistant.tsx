'use client';
import { Dialog, DialogContent } from '@/libs/shadcn-ui/components/dialog';
import { Sparkle } from 'lucide-react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useAssistantStore } from './assistant-store';
const ModalAssistant = () => {
  const { isOpen, setOpen } = useAssistantStore();
  useHotkeys('ctrl+i', (evt) => {
    evt.preventDefault();
    setOpen();
  });
  return (
    <Dialog open={isOpen} onOpenChange={setOpen as any}>
      <DialogContent className="overflow-hidden sm:rounded-none p-0 max-w-full w-full h-full md:max-w-[740px] md:h-[480px] m-0 select-text focus-visible:outline-none focus-visible:ring-0">
        <div className="flex w-full h-full justify-center items-center flex-col gap-2">
          <Sparkle />
          AI assistant
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAssistant;
