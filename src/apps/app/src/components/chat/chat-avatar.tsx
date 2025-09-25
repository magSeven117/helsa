'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@helsa/ui/components/avatar';

import { useTheme } from 'next-themes';
import { useLocalStorage } from 'usehooks-ts';

type User = {
  name: string;
  image?: string;
};

type Props = {
  role: 'assistant' | 'user';
};
export function ChatAvatar({ role }: Props) {
  const [user] = useLocalStorage<User | null>('user', null);
  const { resolvedTheme } = useTheme();
  switch (role) {
    case 'user': {
      return (
        <Avatar className="size-6">
          <AvatarImage src={user?.image!} alt={user?.name} className="object-contain" />
          <AvatarFallback>
            {user?.name
              .split(' ')
              .map((n: any) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
      );
    }

    default:
      return (
        <Avatar className="size-6">
          <AvatarImage
            src={
              resolvedTheme === 'dark'
                ? '/images/HELSA NUEVO BLANCO ISOTIPO.png'
                : '/images/HELSA NUEVO NEGRO ISOTIPO.png'
            }
            alt={user?.name}
            className="object-contain"
          />
          <AvatarFallback>H</AvatarFallback>
        </Avatar>
      );
  }
}