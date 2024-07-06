'use client';
import { Button } from '@/libs/shadcn-ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/libs/shadcn-ui/dropdown-menu';
import { Input } from '@/libs/shadcn-ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from '@/libs/shadcn-ui/sheet';
import { useClerk } from '@clerk/nextjs';
import { Bell, CheckCheck, Edit, Loader2, LogOut, Menu, Search, User2, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { doctorSections, patientSections } from '../side-bar/side-bar';
import styles from './styles.module.css';

const TopBar = ({ role }: { role: string }) => {
  return (
    <div className="flex w-full justify-between items-center  p-8">
      <div className=''>
        <MobileSideBar role={role}/>
        
      </div>
      <div className={styles.topbar_searcher_container}>
        <Searcher/>
      </div>
      <div className="flex gap-2">
        <ProfileMenu />
        <NotificationMenu />
      </div>
    </div>
  );
};

export default TopBar;

const ProfileMenu = () => {
  const [isExiting, setIsExiting] = useState(false);
  const { signOut } = useClerk();
  const onClick = () => {
    setIsExiting(true);
    signOut({ redirectUrl: '/sign-in' });
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={styles.topbar_button}>
          <User2 className={styles.topbar_button_icon} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={'/profile/personal-data'} className={styles.topbar_button_item}>
            <Edit className={styles.topbar_button_icon} /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className={styles.topbar_button_item} onClick={onClick}>
          <LogOut className={styles.topbar_button_icon} /> LogOut { isExiting ? <Loader2 className='w-2 h-2 animate-spin'/> : ''}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const NotificationMenu = () => {
  const notifications = [];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={styles.topbar_button}>
          <Bell className={styles.topbar_button_icon} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className={styles.notification_clean}>
          Clean all notifications <CheckCheck className="w-4 h-4" />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.map((notification, index) => (
          <DropdownMenuItem key={index} className={styles.topbar_notification}>
            <div className={styles.notification_item}>
              <div className={styles.notification_item_title}>
                {notification.title}
              </div>
              <div className={styles.notification_item_message}>
                {notification.message}
              </div>
              <div className={styles.notification_item_date}>
                {notification.date}
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Searcher = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const handleChange = (e: any) => {
    setTerm(e.target.value);
  }
  const searchResults = async (search: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setResults([
      {
        title: 'Jose Veliz',
        description: 'Diabetes type 2',
        age: 25,
        last_consult: '2021-10-10',
        image: 'https://avatars.githubusercontent.com/u/1403241?v=4',
      }
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
    }, 500)

    return () => {
      clearTimeout(timeout);
    }
  }, [term]);
  return (
    <div className={styles.topbar_searcher}>
      <div className={styles.topbar_searcher_icon}>
        {
          term ? <X className={styles.icon}/> : <Search className={styles.icon}/>
        }
      </div>
      <Input className={styles.topbar_searcher_input} placeholder='Search' onChange={handleChange}/>
      {
        isSearching && (
          <div className={styles.searcher_result_container}>
            <div className={styles.icon_loader_container}>
              <Loader2 className={styles.icon_loader}></Loader2>
            </div>
          </div>
        )
      }
      {
        !isSearching && term && results.length > 0 && (
          <div className={styles.searcher_result_container}>
            {results.map((result, index) => (
              <div key={index} className={styles.searcher_result_item}>
                <img src={result.image} alt={result.title} className={styles.searcher_result_item_image}/>
                <div className={styles.searcher_result_item_content}>
                  <div className={styles.searcher_result_item_title}>
                    {result.title} - <span className='font-bold'>{result.age} years</span>
                  </div>
                  <div className={styles.searcher_result_item_description}>
                    {result.description}  - <span className='italic'>
                    last consult {result.last_consult}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      }
      {
        !isSearching && term && results.length === 0 && (
          <div className={styles.searcher_result_container}>
            <div className={styles.searcher_result_not_found}>
              No results found
            </div>
          </div>
        )
      }
    </div>
  );
}

const MobileSideBar = ({ role }: { role: string }) => {
  const pathName = usePathname();
  const [sections, setSections] = useState(role === 'DOCTOR' ? doctorSections : patientSections);
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className={styles.topbar_button_sidebar}>
            <Menu className={styles.topbar_button_icon_sidebar} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-foreground border-none">
          <SheetHeader>
            <div className="w-full flex justify-center items-center gap-3">
              <img src="/images/logo-simple.png" alt="" className="h-[30px]" />
              <p className="text-primary font-bold">Helsa</p>
            </div>
          </SheetHeader>
          <div className={styles.sidebar_sections}>
          {sections.map((section, index) => (
            <div key={section.title}>
              <p className={styles.topbar_sidebar_section_title}>{section.title}</p>
              <div className={styles.topbar_sidebar_section_content}>
                {section.routes.map((route, index) => (
                  <Link href={route.path} key={index} className={
                    `${styles.topbar_sidebar_section_item} ${pathName.includes(route.path) ? styles.active : ''}`
                  } >
                    <div className={`${pathName.includes(route.path) ? styles.item_icon : ''}`}>
                      {route.icon}
                    </div>
                    <p className={styles.sidebar_section_item_text}>{route.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
          <SheetDescription></SheetDescription>
        </SheetContent>
      </Sheet>
    </div>
  );
};