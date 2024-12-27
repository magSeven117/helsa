'use client';
import logoBlack from '@/src/assets/images/Helsa Logo black - white.png';
import logo from '@/src/assets/images/Helsa Logo white - black.png';
import { useTheme } from '@helsa/ui';
import { Button } from '@helsa/ui/components/button';
import Github from '@helsa/ui/components/icons/github';
import Link from 'next/link';

const Header = () => {
  const theme = useTheme();
  return (
    <header className="fixed top-0 left-0 right-0 z-50  bg-background backdrop-blur-sm w-full flex justify-center">
      <nav className="container flex h-16 items-center justify-between px-10 w-[1280px]">
        <div className="flex items-center gap-8">
          <Link className="flex items-center gap-2" href="/">
            {theme.resolvedTheme === 'dark' ? (
              <img src={logo.src} alt="" className="w-8 rounded-none" />
            ) : (
              <img src={logoBlack.src} alt="" className="w-8 rounded-none" />
            )}
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link className="text-sm font-medium" href="#process">
              Features
            </Link>
            <Link className="text-sm font-medium" href="/pricing">
              Pricing
            </Link>
            <Link className="text-sm font-medium" href="#services">
              Blog
            </Link>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2">
          <Button
            size="icon"
            className="hover:bg-background hover:text-foreground hover:border-primary border transition-all duration-500 hover:shadow-md"
            variant={'outline'}
          >
            <Link href={'https://github.com/Duccem'} target="_blank">
              <Github />
            </Link>
          </Button>
          <Link href={'https://app.helsa.com/sign-in'}>
            <Button className="gap-2 text-primary bg-color-brand-primary hover:bg-background hover:text-foreground hover:border-primary border transition-all duration-500 hover:shadow-md">
              Entrar
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
