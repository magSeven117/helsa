'use client';
import logo from '@/src/assets/images/Helsa Logo black - white.png';
import logo2 from '@/src/assets/images/Helsa Logo white.png';
import type { ChatAIProvider } from '@/src/components/chat/chat-ai-provider';
import { Avatar, AvatarFallback, AvatarImage } from '@helsa/ui/components/avatar';

import { useAIState } from 'ai/rsc';
import { useTheme } from 'next-themes';

type Props = {
  role: 'assistant' | 'user';
};
export function ChatAvatar({ role }: Props) {
  const [aiState] = useAIState<typeof ChatAIProvider>();
  const theme = useTheme();
  switch (role) {
    case 'user': {
      return (
        <Avatar className="size-6">
          <AvatarImage src={aiState.user.image} alt={aiState.user.name} className="object-contain" />
          <AvatarFallback>
            {aiState.user.name
              .split(' ')
              .map((n: any) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
      );
    }

    default:
      return (
        <div className="size-8">
          {theme.theme === 'dark' || theme.theme === 'system' ? (
            <img src={logo.src} alt="" className="rounded-full border" />
          ) : (
            <img src={logo2.src} alt="" className="rounded-full border" />
          )}
        </div>
      );
  }
}
