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
import { Activity, Calendar, LayoutDashboard } from 'lucide-react';
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
  return (
    <Sidebar>
      <SidebarHeader className='pt-6 px-3 bg-foreground text-background'>
        <Link href={'/'} className="flex items-center justify-center gap-[10px] mx-2">
          <div className="flex justify-center items-center gap-3">
           <Activity className='text-background overflow-hidden' />
            <p className="text-background text-lg font-bold">Helsa</p>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className='px-3 bg-foreground text-background'>
        <SidebarGroup>
          <SidebarGroupLabel className='text-muted-foreground'>GENERAL</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {doctorSections.map((item) => (
                <SidebarMenuItem key={item.title} className=''>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className='text-muted-foreground'>HERRAMIENTAS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {doctorSections.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SideBar;

export const doctorSections = [
  {
    icon: LayoutDashboard,
    title: 'Dashboard',
    url: '/dashboard',
  },
  {
    icon: Calendar,
    title: 'Schedule',
    url: '/schedule',
  },
];
