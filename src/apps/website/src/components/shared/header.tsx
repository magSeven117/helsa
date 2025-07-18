'use client';
import logoComplete from '@/src/assets/images/HELSA NUEVO BLANCO.png';
import { useTheme } from '@helsa/ui';
import { Button } from '@helsa/ui/components/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@helsa/ui/components/navigation-menu';
import { cn } from '@helsa/ui/lib/utils';
import { Moon, Sun } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  const { setTheme } = useTheme();
  return (
    <header className="top-0 z-50 hidden  md:flex justify-center w-full bg-background h-[80px] min-[1700px]:h-[80px]">
      <div className="w-[80%] min-[1700px]:w-2/3 px-6 mt-2 flex items-center justify-between gap-10  container relative  rounded-lg bg-foreground dark:bg-background dark:border border-border">
        <div className="flex items-center gap-4">
          <Link className="flex items-center gap-2" href="/">
            <img src={logoComplete.src} alt="" className="object-contain h-10" />
          </Link>
        </div>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  'bg-foreground dark:bg-background text-white hover:bg-brand-primary dark:hover:bg-brand-primary dark:text-white hover:text-white',
                )}
              >
                <Link href="/about">Nosotros</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  'bg-foreground dark:bg-background text-white hover:bg-brand-primary dark:hover:bg-brand-primary dark:text-white hover:text-white',
                )}
              >
                <Link href="/professionals">Profesionales</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  'bg-foreground dark:bg-background text-white hover:bg-brand-primary dark:hover:bg-brand-primary dark:text-white hover:text-white',
                )}
              >
                <Link href="/patients">Pacientes</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  'bg-foreground dark:bg-background text-white hover:bg-brand-primary dark:hover:bg-brand-primary dark:text-white hover:text-white',
                )}
              >
                <Link href="/pricing">Precios</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  'bg-foreground dark:bg-background text-white hover:bg-brand-primary dark:hover:bg-brand-primary dark:text-white hover:text-white',
                )}
              >
                <Link href="/blog">Blog</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex justify-between items-center gap-2  pl-3">
          <Link href={'https://app.helsahealthcare.com/sign-in'}>
            <Button variant={'outline'}>Entrar</Button>
          </Link>
          <Link href={'https://app.helsahealthcarte.com/sign-up'}>
            <Button variant={'primary'} className="text-white">
              Registrarse
            </Button>
          </Link>
          <Button
            className="text-brand-primary"
            size={'icon'}
            variant={'ghost'}
            onClick={() => {
              setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
            }}
          >
            <Sun className="dark:hidden block" />
            <Moon className="hidden dark:block" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

function ListItem({ title, children, href, ...props }: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
  return (
    <li {...props} className="h-full">
      <NavigationMenuLink asChild className="hover:bg-brand-primary hover:text-white">
        <Link href={href} className="h-full">
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className=" line-clamp-2 text-sm leading-snug">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
