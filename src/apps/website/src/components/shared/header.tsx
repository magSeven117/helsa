'use client';
import { Button } from '@helsa/ui/components/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@helsa/ui/components/navigation-menu';
import Link from 'next/link';
import { useState } from 'react';
import { HelsaCompleteLogo } from './helsa-icon';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 hidden  md:flex justify-center w-full bg-white h-[80px] min-[1700px]:h-[100px]">
      <div className="w-[80%] min-[1700px]:w-2/3 flex items-center justify-between gap-10  lg:py-3 container relative  rounded-lg">
        <div className="flex items-center gap-4">
          <Link className="flex items-center gap-2" href="/">
            <HelsaCompleteLogo className="object-contain" />
          </Link>
        </div>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/about">Nosotros</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/professionals">Profesionales</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/patients">Pacientes</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/docs">Precios</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/docs">Como funciona</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex justify-between items-center gap-2  pl-3">
          <Link href={'https://app.helsa.com/sign-in'}>
            <Button variant={'outline'} size={'sm'}>
              Entrar
            </Button>
          </Link>
          <Link href={'https://app.helsa.com/sign-up'}>
            <Button size={'sm'} variant={'primary'}>
              Registrarse
            </Button>
          </Link>
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
