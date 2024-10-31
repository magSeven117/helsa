'use client';
import logo from '@/assets/images/Helsa Logo white - black.png';
import { Avatar, AvatarFallback, AvatarImage } from '@/libs/shadcn-ui/components/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/libs/shadcn-ui/components/dropdown-menu';
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
} from '@/libs/shadcn-ui/components/sidebar';
import { cn } from '@/libs/shadcn-ui/utils/utils';
import { useClerk, useUser } from '@clerk/nextjs';
import {
  Bell,
  Calendar,
  ChevronsUpDown,
  CircleDollarSign,
  CreditCard,
  LayoutDashboard,
  LogOut,
  MessagesSquare,
  PieChart,
  Sparkles,
  User,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { CustomTrigger } from './sidabar-trigger';

export interface Section {
  title: string;
  routes: SectionRoute[];
}

export interface SectionRoute {
  icon: React.ReactNode;
  name: string;
  path: string;
}

const SideBar = ({  role }: { role: string }) => {
  const {user, isSignedIn} = useUser();
  const sections = role === 'DOCTOR' ? doctorSections : patientSections;
  const path = usePathname();
  const { signOut } = useClerk();
  const router = useRouter();
  const onClick = () => {
    signOut({ redirectUrl: '/sign-in' });
  };
  if(!isSignedIn) {
    return null;
  }
  return (
    <Sidebar collapsible="icon">
      <div className="absolute -right-2.5 top-11 max-sm:hidden">
        <CustomTrigger />
      </div>
      <SidebarHeader className="">
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Link href="/dashboard" className="flex items-center justify-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
              <img src={logo.src} alt="" className='rounded-lg'/>
            </div>
            <p className="text-lg font-bold">Helsa</p>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="mt-5">
        {sections.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel className="text-muted-foreground">{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.routes.map((route) => (
                  <SidebarMenuItem key={route.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn('hover:bg-primary hover:text-primary-foreground', {
                        'bg-primary text-primary-foreground': path == route.url,
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
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.imageUrl} alt={user.fullName} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.fullName}</span>
                    <span className="truncate text-xs">{user.emailAddresses[0].emailAddress}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user.imageUrl} alt={user.fullName} />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user.fullName}</span>
                      <span className="truncate text-xs">{user.emailAddresses[0].emailAddress}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className='gap-2'>
                    <Sparkles />
                    Upgrade to Pro
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className='gap-2 cursor-pointer' onClick={() => router.push('/profile')}>
                    <User />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className='gap-2'>
                    <CreditCard />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem className='gap-2'>
                    <Bell />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='gap-2 cursor-pointer' onClick={onClick}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
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
