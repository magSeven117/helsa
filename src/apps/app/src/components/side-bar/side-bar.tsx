'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@helsa/ui/components/sidebar';
import { cn } from '@helsa/ui/lib/utils';
import { motion } from 'framer-motion';
import {
  BookMarked,
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
import Icon from './icon';
import { SidebarTrigger } from './sidabar-trigger';
import SidebarNotifications from './sidebar-notifications';
import { NavUser } from './user-sidebar';

export interface Section {
  title: string;
  routes: SectionRoute[];
}

export interface SectionRoute {
  icon: React.ReactNode;
  name: string;
  path: string;
}

const SideBar = ({ user }: { user: any }) => {
  const sections = sideBarItems.map((section) => ({
    title: section.title,
    routes: section.routes.filter((route) => route.roles.includes(user.role)),
  }));
  const path = usePathname();
  const theme = useTheme();
  const { open, state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  return (
    <Sidebar collapsible="icon" className="bg-background" variant="inset">
      <SidebarHeader
        className={cn(
          'flex md:pt-3.5',
          isCollapsed ? 'items-center justify-between gap-y-4 flex-col' : 'flex-row items-center justify-between',
        )}
      >
        <Link href={'/'}>
          <Icon />
        </Link>
        <motion.div
          key={isCollapsed ? 'header-collapsed' : 'header-expanded'}
          className={`flex ${isCollapsed ? 'flex-row md:flex-col-reverse' : 'flex-row'} items-center gap-2`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <SidebarTrigger />
        </motion.div>
      </SidebarHeader>
      <SidebarContent className="">
        {sections.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel className="text-muted-foreground">{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.routes.map((route) => (
                  <SidebarMenuItem key={route.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn('hover:bg-[var(--color-brand-primary)] hover:text-white dark:text-white', {
                        'bg-[var(--color-brand-primary)] text-white': path == route.url,
                      })}
                    >
                      <Link href={route.url} prefetch={true}>
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
      <SidebarFooter>
        <SidebarNotifications />
        <NavUser user={user} />
      </SidebarFooter>
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
        icon: BookMarked,
        title: 'Citas',
        url: '/appointments',
        roles: ['DOCTOR', 'PATIENT'],
      },
      {
        icon: Stethoscope,
        title: 'Doctores',
        url: '/book',
        roles: ['PATIENT'],
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
