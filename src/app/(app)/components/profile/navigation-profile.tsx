'use client';

import { cn } from '@/libs/shadcn-ui/utils/utils';
import { Bell, Briefcase, KeyRound, LucideIcon, Palette, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  role: string;
}

export function NavigationProfile({ className, role, ...props }: SidebarNavProps) {
  const pathname = usePathname();
  const items = role === 'DOCTOR' ? doctorSidebarNavItems : [];
  return (
    <Nav
      links={items.map((item) => ({
        title: item.title,
        icon: item.icon,
        href: item.href,
        variant: pathname === item.href ? 'default' : 'ghost',
      }))}
    />
  );
}

interface NavProps {
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    href: string;
    variant: 'default' | 'ghost';
  }[];
}

export function Nav({ links }: NavProps) {
  const pathname = usePathname();
  return (
    <div className="flex  gap-5 py-2 justify-start items-center max-sm:max-w-full max-sm:overflow-x-scroll no-scroll">
      {links.map((link, index) => (
        <Link href={link.href} key={link.title} className={cn('text-muted-foreground', {
          'text-primary font-bold': pathname === link.href,
        })}>
          {link.title}
        </Link>
      ))}
    </div>
  );
}

const doctorSidebarNavItems = [
  {
    title: 'General',
    href: '/profile',
    icon: SlidersHorizontal,
  },
  {
    title: 'Doctor',
    href: '/profile/professional',
    icon: Briefcase,
  },
  {
    title: 'Apariencia',
    href: '/profile/appearance',
    icon: Palette,
  },
  {
    title: 'Notificaciones',
    href: '/profile/notifications',
    icon: Bell,
  },
  {
    title: 'Contraseña',
    href: '/profile/security',
    icon: KeyRound,
  },
];
