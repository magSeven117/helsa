'use client';

import { cn } from '@/libs/shadcn-ui/utils/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  role: string;
}

export function NavigationProfile({ className, role, ...props }: SidebarNavProps) {
  const pathname = usePathname();
  const items = navItems.filter((item) => item.roles.includes(role));
  return (
    <Nav
      links={items.map((item) => ({
        title: item.title,
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
const navItems = [
  {
    title: 'General',
    href: '/profile',
    roles: ['DOCTOR', 'PATIENT', 'HOSPITAL'],
  },
  {
    title: 'Doctor',
    href: '/profile/professional',
    roles: ['DOCTOR'],
  },
  {
    title: 'Paciente',
    href: '/profile/patient',
    roles: ['PATIENT'],
  },
  {
    title: 'Hospital',
    href: '/profile/hospital',
    roles: ['HOSPITAL'],
  },
  {
    title: 'Apariencia',
    href: '/profile/appearance',
    roles: ['DOCTOR', 'PATIENT', 'HOSPITAL'],
  },
  {
    title: 'Notificaciones',
    href: '/profile/notifications',
    roles: ['DOCTOR', 'PATIENT', 'HOSPITAL'],
  },
  {
    title: 'Contraseña',
    href: '/profile/security',
    roles: ['DOCTOR', 'PATIENT', 'HOSPITAL'],
  },
]
