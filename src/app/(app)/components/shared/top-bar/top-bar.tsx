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
import { Input } from '@/libs/shadcn-ui/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/libs/shadcn-ui/components/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/libs/shadcn-ui/components/tabs';
import { useClerk } from '@clerk/nextjs';
import { Bell, Command, Inbox, Loader2, LogOut, Search, Settings, Sparkles, SunMoon, User, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SidebarTrigger } from '../side-bar/sidabar-trigger';

const TopBar = () => {
  const { user } = useClerk();
  return (
    <div className="flex w-full justify-between items-center  px-8 py-5 border-b">
      <div className="flex w-1/2 items-center gap-3">
        <SidebarTrigger />
        <Searcher />
      </div>
      <div className="flex items-center gap-3">
        <AIButton />
        <CommandButton />
        <NotificationButton />
        <ProfileButton user={user} />
      </div>
    </div>
  );
};

export default TopBar;

const Searcher = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const handleChange = (e: any) => {
    setTerm(e.target.value);
  };
  const router = useRouter();
  const searchResults = async (search: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setResults([
      {
        title: 'Jose Veliz',
        description: 'Diabetes type 2',
        age: 25,
        last_consult: '2021-10-10',
        image: 'https://avatars.githubusercontent.com/u/1403241?v=4',
      },
      {
        title: 'Jose Veliz',
        description: 'Diabetes type 2',
        age: 25,
        last_consult: '2021-10-10',
        image: 'https://avatars.githubusercontent.com/u/1403241?v=4',
      },
    ]);
    setIsSearching(false);
  };
  useEffect(() => {
    if (!term || term === '') {
      setResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const timeout = setTimeout(async () => {
      await searchResults(term);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [term]);
  const navigate = (id: string) => {
    router.push(`/patients/${id}`);
    setTerm('');
  }
  return (
    <div className="rounded-full flex-1 flex relative items-center gap-2">
      <div className="w-full pr-10 relative">
        <Input
          className="outline-none text-secondary-foreground rounded-none box-border focus-visible:ring-transparent"
          placeholder="Buscar"
          value={term}
          onChange={handleChange}
        />
        {!isSearching && term && results.length > 0 ? (
          <div
            className="absolute z-20 right-[46px] top-[7px] bg-sidebar p-1 flex justify-center items-center border rounded-none text-xs cursor-pointer"
            onClick={() => setTerm('')}
          >
            <X className="size-4" />
          </div>
        ) : (
          <div className="absolute z-20 right-[46px] top-[7px] bg-sidebar p-1 flex justify-center items-center border rounded-none text-xs">
            <Search className="size-4" />
          </div>
        )}
      </div>
      {isSearching && (
        <div className="absolute w-full pr-10 z-50 bg-background left-0 top-[50px]">
          <div className=" bg-background w-full h-[250px] rounded-none shadow border">
            <div className="flex justify-center items-center h-full">
              <Loader2 className="h-[50px] w-[50px] text-primary animate-spin"></Loader2>
            </div>
          </div>
        </div>
      )}
      {!isSearching && term && results.length > 0 && (
        <div className="absolute w-full pr-10 z-50 bg-background left-0 top-[50px]">
          <div className="w-full h-[250px] rounded-none shadow border p-2 space-y-2">
            {results.map((result, index) => (
              <div key={index} className="flex gap-2 p-2 cursor-pointer hover:bg-border border" onClick={() => navigate(result.title)}>
                <img src={result.image} alt={result.title} className="h-[50px] w-[50px] rounded-full" />
                <div className="flex flex-col justify-center">
                  <div className="font-bold text-[1rem]">
                    {result.title} - <span className="font-bold">{result.age} years</span>
                  </div>
                  <div className="text-xs">
                    {result.description} - <span className="italic">last consult {result.last_consult}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {!isSearching && term && results.length === 0 && (
        <div className="absolute z-50 bg-background w-4/5 h-[250px] rounded shadow border left-[50px] top-[50px]">
          <div className="flex justify-center items-center h-full text-xl font-bold">No results found</div>
        </div>
      )}
    </div>
  );
};

const AIButton = () => {
  return (
    <div className="flex justify-start items-center gap-3 text-muted-foreground hover:text-foreground cursor-pointer text-sm">
      <span className="bg-sidebar p-1 flex justify-center items-center border rounded-none text-xs">
        <Sparkles className="size-4 mr-2" /> {' Helsa IA'}
      </span>
    </div>
  );
};

const CommandButton = () => {
  return (
    <div className="flex justify-start items-center gap-3 text-muted-foreground hover:text-foreground cursor-pointer text-sm">
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
          <Bell className="size-10" />
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
  const { signOut } = useClerk();
  const onClick = () => {
    signOut({ redirectUrl: '/sign-in' });
  };
  const { setTheme, theme } = useTheme()
  const changeTheme = (theme: string) => {
    setTheme(theme)
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className="w-10 h-10 rounded-full p-0 outline-none border-none focus-visible:outline-none focus:outline-none"
        >
          <Avatar className="h-10 w-10 rounded-full">
            <AvatarImage src={user?.imageUrl || ''} alt={user?.fullName || ''} className="object-contain" />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
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
              <span className="truncate font-semibold">{user?.fullName || 'Jose Veliz'}</span>
              <span className="truncate text-xs">{user?.emailAddresses[0]?.emailAddress || ''}</span>
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
