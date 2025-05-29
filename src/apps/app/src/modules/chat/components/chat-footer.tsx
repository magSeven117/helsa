import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useAssistantStore } from '../../assistant/store/assistant-store';

type Props = {
  onSubmit: () => void;
  showFeedback: () => void;
};

export function ChatFooter({ onSubmit, showFeedback }: Props) {
  const theme = useTheme();
  const router = useRouter();
  const { setOpen } = useAssistantStore();

  const handleOpenUrl = (url: string) => {
    router.push(url);
  };

  return (
    <div className="hidden  md:flex pr-3 h-[50px] w-full border-t-[1px] items-center bg-background backdrop-filter dark:border-[#2C2C2C] backdrop-blur-lg dark:bg-[#151515]/[99]">
      <div className="ml-auto flex space-x-4">
        <button className="flex space-x-2 items-center text-xs" type="button" onClick={onSubmit}>
          <span>Submit</span>
          <kbd className="pointer-events-none h-5 select-none items-center gap-1 border bg-accent px-1.5 font-mono text-[10px] font-medium">
            <span>↵</span>
          </kbd>
        </button>
      </div>
    </div>
  );
}
