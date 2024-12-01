'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/libs/shadcn-ui/components/avatar';
import { Button } from '@/libs/shadcn-ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/libs/shadcn-ui/components/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/libs/shadcn-ui/components/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/libs/shadcn-ui/components/tabs';
import { authClient } from '@/modules/shared/infrastructure/auth/auth-client';
import { useKBar } from 'kbar';
import { Bell, Command, Inbox, LogOut, Settings, Sparkles, SunMoon, User } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useAssistantStore } from '../assistant/assistant-store';
import { SidebarTrigger } from '../side-bar/sidabar-trigger';

const TopBar = () => {
  const { data } = authClient.useSession();
  return (
    <div className="flex w-full justify-between items-center pl-5  pr-8 py-5 border-b">
      <div className="flex w-1/2 items-center gap-5">
        <SidebarTrigger />
        <AIButton />
        <CommandButton />
      </div>
      <div className="flex items-center gap-3">
        <NotificationButton />
        <ProfileButton user={data?.user!} />
      </div>
    </div>
  );
};

export default TopBar;

const AIButton = () => {
  const { setOpen } = useAssistantStore();
  return (
    <div
      className="flex justify-start items-center gap-3 text-muted-foreground hover:text-foreground cursor-pointer text-sm"
      onClick={() => setOpen()}
    >
      <span className="p-1 flex justify-center items-center rounded-none text-xs">
        <Sparkles className="size-4 mr-2" /> {'Ask Helsa a question'}
      </span>
    </div>
  );
};

const CommandButton = () => {
  const { query } = useKBar();

  return (
    <div
      className="flex justify-start items-center gap-3 text-muted-foreground hover:text-foreground cursor-pointer text-sm"
      onClick={() => query.toggle()}
    >
      <span className="bg-sidebar p-1 flex justify-center items-center border rounded-none text-xs">
        <Command className="size-4" /> {' + K'}
      </span>
    </div>
  );
};

const NotificationButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 border p-4">
          <Bell className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="h-[500px] w-[350px] rounded-none p-0">
        <Tabs defaultValue="inbox">
          <div className="px-4 py-4 border-b flex justify-between items-center">
            <TabsList className="bg-transparent">
              <TabsTrigger value="inbox">Bandeja</TabsTrigger>
              <TabsTrigger value="archive">Archivados</TabsTrigger>
            </TabsList>
            <div>
              <Button variant="ghost" className="rounded-full p-2 size-10">
                <Settings className="size-4" />
              </Button>
            </div>
          </div>
          <TabsContent value="inbox">
            <div className="w-full h-full flex flex-col gap-2 justify-center items-center mt-3">
              <div className="border p-3 rounded-full">
                <Inbox />
              </div>
              <p className="text-muted-foreground text-sm">No hay notificaciones en tu inbox</p>
            </div>
          </TabsContent>
          <TabsContent value="archive">
            <div className="w-full h-full flex flex-col gap-2 justify-center items-center mt-3">
              <div className="border p-3 rounded-full">
                <Inbox />
              </div>
              <p className="text-muted-foreground text-sm">No has archivado mensajes</p>
            </div>
          </TabsContent>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ProfileButton = ({ user }: { user: any }) => {
  const router = useRouter();
  const onClick = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/sign-in');
        },
      },
    });
  };
  const { setTheme, theme } = useTheme();
  const changeTheme = (theme: string) => {
    setTheme(theme);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className="w-10 h-10 rounded-full border p-0 outline-none border-none focus-visible:outline-none focus:outline-none"
        >
          <Avatar className="h-10 w-10 rounded-full border">
            <AvatarImage src={user?.image || ''} alt={user?.name || ''} className="object-contain" />
            <AvatarFallback className="rounded-lg">
              <User className="size-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-none"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user?.name || 'Jose Veliz'}</span>
              <span className="truncate text-xs">{user?.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="gap-2 text-sm rounded-xs cursor-pointer">
            <Sparkles className="size-4" />
            Mejora a pro
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="gap-2 text-sm rounded-xs cursor-pointer" onClick={() => router.push('/profile')}>
            <User className="size-4" />
            Perfil
          </DropdownMenuItem>

          <DropdownMenuItem className="gap-2 text-sm rounded-xs cursor-pointer">
            <Bell className="size-4" />
            Notificaciones
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <div className="flex justify-between items-center gap-3 py-3 pr-3">
            <div className="ml-2 flex justify-start items-center gap-2">
              <SunMoon className="size-4" />
              Tema
            </div>
            <Select defaultValue={theme} onValueChange={changeTheme}>
              <SelectTrigger className="rounded-none w-1/2 p-2 h-[25px]">
                <SelectValue placeholder="select" />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value={'light'}>
                  <span className="flex w-full justify-between items-center gap-3">Light</span>
                </SelectItem>
                <SelectItem value={'dark'}>
                  <span className="flex w-full justify-between items-center gap-3">Dark</span>
                </SelectItem>
                <SelectItem value={'system'}>
                  <span className="flex w-full justify-between items-center gap-3">System</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 text-sm rounded-xs cursor-pointer" onClick={onClick}>
          <LogOut className="size-4" />
          Salir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
