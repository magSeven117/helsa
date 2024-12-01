'use client';
import logo2 from '@/assets/images/Helsa Logo black.png';
import logo from '@/assets/images/Helsa Logo white.png';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/libs/shadcn-ui/components/sidebar';
import { cn } from '@/libs/shadcn-ui/utils/utils';
import { authClient } from '@/modules/shared/infrastructure/auth/auth-client';
import {
  Calendar,
  CircleDollarSign,
  History,
  LayoutDashboard,
  MessagesSquare,
  PieChart,
  Stethoscope,
  Users,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface Section {
  title: string;
  routes: SectionRoute[];
}

export interface SectionRoute {
  icon: React.ReactNode;
  name: string;
  path: string;
}

const SideBar = ({ role }: { role: string }) => {
  const { data } = authClient.useSession();
  const sections = sideBarItems.map((section) => ({
    title: section.title,
    routes: section.routes.filter((route) => route.roles.includes(role)),
  }));
  const path = usePathname();
  const theme = useTheme();
  if (!data?.session) {
    return null;
  }
  return (
    <Sidebar collapsible="icon" className="bg-background">
      <SidebarHeader className="bg-background">
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground rounded-none"
        >
          <Link href="/dashboard" className="flex items-center justify-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
              {theme.theme === 'dark' || theme.theme === 'system' ? (
                <img src={logo.src} alt="" className="rounded-lg" />
              ) : (
                <img src={logo2.src} alt="" className="rounded-lg" />
              )}
            </div>
            <p className="text-lg font-bold">Helsa</p>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="bg-background">
        {sections.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel className="text-muted-foreground">{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.routes.map((route) => (
                  <SidebarMenuItem key={route.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn('hover:bg-sidebar hover:border rounded-none', {
                        'border  bg-sidebar': path == route.url,
                      })}
                    >
                      <Link href={route.url}>
                        {<route.icon />}
                        <span>{route.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};

export default SideBar;

export const sideBarItems = [
  {
    title: 'General',
    routes: [
      {
        icon: LayoutDashboard,
        title: 'Inicio',
        url: '/dashboard',
        roles: ['DOCTOR', 'PATIENT', 'HOSPITAL'],
      },
      {
        icon: Calendar,
        title: 'Calendario',
        url: '/schedule',
        roles: ['DOCTOR', 'PATIENT', 'HOSPITAL'],
      },
      {
        icon: History,
        title: 'Historial medico',
        url: '/medical-history',
        roles: ['PATIENT'],
      },
      {
        icon: Users,
        title: 'Pacientes',
        url: '/patients',
        roles: ['DOCTOR', 'HOSPITAL'],
      },
      {
        icon: Stethoscope,
        title: 'Doctores',
        url: '/patients',
        roles: ['HOSPITAL'],
      },
      {
        icon: PieChart,
        title: 'Reportes',
        url: '/reports',
        roles: ['DOCTOR', 'PATIENT', 'HOSPITAL'],
      },
    ],
  },
  {
    title: 'Tools',
    routes: [
      {
        icon: MessagesSquare,
        title: 'Mensajería',
        url: '/chats',
        roles: ['DOCTOR', 'PATIENT', 'HOSPITAL'],
      },
      {
        icon: CircleDollarSign,
        title: 'Facturación',
        url: '/billing',
        roles: ['DOCTOR', 'PATIENT', 'HOSPITAL'],
      },
    ],
  },
];
