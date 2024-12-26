import logo2 from '@/src/assets/images/Helsa Logo black.png';
import logo from '@/src/assets/images/Helsa Logo white.png';
import { Icons } from '@helsa/ui/components/icons';
import { Popover, PopoverContent, PopoverTrigger } from '@helsa/ui/components/popover';
import { MessageCircleMore, Outdent, Settings } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useAssistantStore } from '../../store/assistant/assistant-store';

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
    <div className="hidden  md:flex pr-3 h-[40px] w-full border-t-[1px] items-center bg-background backdrop-filter dark:border-[#2C2C2C] backdrop-blur-lg dark:bg-[#151515]/[99]">
      <Popover>
        <PopoverTrigger>
          <div className="scale-50 opacity-50 -ml-2">
            <div className="size-16">
              {theme.theme === 'dark' || theme.theme === 'system' ? (
                <img src={logo.src} alt="" className="rounded-lg" />
              ) : (
                <img src={logo2.src} alt="" className="rounded-lg" />
              )}
            </div>
          </div>
        </PopoverTrigger>

        <PopoverContent
          className="bg-background backdrop-filter dark:border-[#2C2C2C] backdrop-blur-lg dark:bg-[#1A1A1A]/95 p-2 rounded-lg -ml-2 w-auto"
          side="top"
          align="start"
          sideOffset={10}
        >
          <ul className="flex flex-col space-y-2">
            <li>
              <button
                type="button"
                className="flex space-x-2 items-center text-xs hover:bg-[#F2F1EF] dark:hover:bg-[#2b2b2b] rounded-md transition-colors w-full p-1"
                onClick={() => handleOpenUrl('https://x.com/middayai')}
              >
                <Icons.twitter className="w-[16px] h-[16px]" />
                <span>Follow us</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="flex space-x-2 items-center text-xs hover:bg-[#F2F1EF] dark:hover:bg-[#2b2b2b] rounded-md transition-colors w-full p-1"
                onClick={() => handleOpenUrl('https://go.midday.ai/anPiuRx')}
              >
                <Icons.gitHub className="w-[16px] h-[16px]" />
                <span>Join Our Community</span>
              </button>
            </li>

            <li>
              <button
                type="button"
                className="flex space-x-2 items-center text-xs hover:bg-[#F2F1EF] dark:hover:bg-[#2b2b2b] rounded-md transition-colors w-full p-1"
                onClick={showFeedback}
              >
                <MessageCircleMore className="w-[16px] h-[16px]" />
                <span>Send feedback</span>
              </button>
            </li>

            <li>
              <button
                type="button"
                className="flex space-x-2 items-center text-xs hover:bg-[#F2F1EF] dark:hover:bg-[#2b2b2b] rounded-md transition-colors w-full p-1"
                onClick={() => handleOpenUrl('https://git.new/midday')}
              >
                <Icons.gitHub className="w-[16px] h-[16px]" />
                <span>Github</span>
              </button>
            </li>

            <li>
              <button
                type="button"
                className="flex space-x-2 items-center text-xs hover:bg-[#F2F1EF] dark:hover:bg-[#2b2b2b] rounded-md transition-colors w-full p-1"
                onClick={() => {
                  router.push('/account/assistant');
                  setOpen();
                }}
              >
                <Settings className="w-[16px] h-[16px]" />
                <span>Settings</span>
              </button>
            </li>

            <li className="hidden todesktop:block">
              <button
                type="button"
                className="flex space-x-2 items-center text-xs hover:bg-[#F2F1EF] dark:hover:bg-[#2b2b2b] rounded-md transition-colors w-full p-1 text-destructive"
              >
                <Outdent className="w-[16px] h-[16px]" />
                <span>Quit Midday</span>
              </button>
            </li>
          </ul>
        </PopoverContent>
      </Popover>

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
