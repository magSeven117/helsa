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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/libs/shadcn-ui/components/tabs';
import { useClerk } from '@clerk/nextjs';
import {
  Bell,
  Command,
  CreditCard,
  Inbox,
  Loader2,
  LogOut,
  Settings,
  Sparkles,
  User
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SidebarTrigger } from '../side-bar/sidabar-trigger';

const TopBar = () => {
  const { user } = useClerk()
  return (
    <div className="flex w-full justify-between items-center  px-8 py-5 border-b">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <TopButton />
      </div>
      <div className='flex items-center gap-3'>
        <NotificationButton />
        <ProfileButton user={user}/>
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
  return (
    <div className="w-full rounded-full flex flex-col relative items-center gap-2 max-md:w-1/2">
      <Input
        className="border border-secondary bg-background outline-none text-secondary-foreground rounded-full box-border w-4/5 focus-visible:ring-transparent"
        placeholder="Search"
        onChange={handleChange}
      />
      {isSearching && (
        <div className="z-50 bg-background w-4/5 h-[250px] rounded shadow border left-[50px] top-[50px]">
          <div className="flex justify-center items-center h-full">
            <Loader2 className="h-[50px] w-[50px] text-primary animate-spin"></Loader2>
          </div>
        </div>
      )}
      {!isSearching && term && results.length > 0 && (
        <div className="z-50 bg-background w-4/5 h-[250px] rounded shadow border left-[50px] top-[50px]">
          {results.map((result, index) => (
            <div key={index} className="flex gap-2 p-2 cursor-pointer hover:bg-border">
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
      )}
      {!isSearching && term && results.length === 0 && (
        <div className="z-50 bg-background w-4/5 h-[250px] rounded shadow border left-[50px] top-[50px]">
          <div className="flex justify-center items-center h-full text-xl font-bold">No results found</div>
        </div>
      )}
    </div>
  );
};

const TopButton = () => {
  return (
    <div className="flex justify-start items-center gap-3 text-muted-foreground hover:text-foreground cursor-pointer text-sm">
      <p className="font-light">Pregúntale a Helsa por cualquier cosa</p>
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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className="w-10 h-10 rounded-full p-0 outline-none border-none focus-visible:outline-none focus:outline-none"
        >
          <Avatar className="h-10 w-10 rounded-full">
            <AvatarImage src={user?.imageUrl || ''} alt={user?.fullName || '' } />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-none"
        align="end" sideOffset={8}
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
            <Sparkles className='size-4'/>
            Upgrade to Pro
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="gap-2 text-sm rounded-xs cursor-pointer" onClick={() => router.push('/profile')}>
            <User className='size-4'/>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 text-sm rounded-xs cursor-pointer">
            <CreditCard className='size-4'/>
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 text-sm rounded-xs cursor-pointer">
            <Bell className='size-4'/>
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 text-sm rounded-xs cursor-pointer" onClick={onClick}>
          <LogOut className='size-4'/>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
