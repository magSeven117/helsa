'use client';
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
import { Activity, Calendar, CircleDollarSign, LayoutDashboard, MessagesSquare, PieChart, Users } from 'lucide-react';
import Link from 'next/link';

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
  const sections = role === 'DOCTOR' ? doctorSections : patientSections;
  return (
    <Sidebar>
      <SidebarHeader className="pt-6 px-3 bg-foreground text-background">
        <Link href={'/'} className="flex items-center justify-center gap-[10px] mx-2">
          <div className="flex justify-center items-center gap-3">
            <Activity className="text-background overflow-hidden" />
            <p className="text-background text-lg font-bold">Helsa</p>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-3 bg-foreground text-background">
        {sections.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel className="text-muted-foreground">{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.routes.map((route) => (
                  <SidebarMenuItem key={route.title} className="">
                    <SidebarMenuButton asChild>
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

export const doctorSections = [
  {
    title: 'General',
    routes: [
      {
        icon: LayoutDashboard,
        title: 'Inicio',
        url: '/dashboard',
      },
      {
        icon: Calendar,
        title: 'Calendario',
        url: '/schedule',
      },
      {
        icon: Users,
        title: 'Pacientes',
        url: '/patients',
      },
      {
        icon: PieChart,
        title: 'Reportes',
        url: '/patients',
      },
    ],
  },
  {
    title: 'Tools',
    routes: [
      {
        icon: MessagesSquare,
        title: 'Mensajeria',
        url: '/doctor/chats',
      },
      {
        icon: CircleDollarSign,
        title: 'Facturación',
        url: '/doctor/billing',
      },
    ],
  },
];
export const patientSections = [
  {
    title: 'General',
    routes: [
      {
        icon: LayoutDashboard,
        title: 'Inicio',
        url: '/patient/dashboard',
      },
    ],
  },
];
