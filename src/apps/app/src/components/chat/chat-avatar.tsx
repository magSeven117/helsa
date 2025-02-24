'use client';
import logo from '@/src/assets/images/HELSA NUEVO BLANCO ISOTIPO.png';
import logo2 from '@/src/assets/images/HELSA NUEVO NEGRO ISOTIPO.png';
import { User } from '@helsa/database';
import { Avatar, AvatarFallback, AvatarImage } from '@helsa/ui/components/avatar';

import { useTheme } from 'next-themes';
import { useLocalStorage } from 'usehooks-ts';

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
            src={resolvedTheme === 'dark' ? logo.src : logo2.src}
            alt={user?.name}
            className="object-contain"
          />
          <AvatarFallback>H</AvatarFallback>
        </Avatar>
      );
  }
}
