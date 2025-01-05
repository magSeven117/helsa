'use client';
import logoBlack from '@/src/assets/images/Helsa Logo black - white.png';
import logo from '@/src/assets/images/Helsa Logo white - black.png';
import { useTheme } from '@helsa/ui';
import Link from 'next/link';

const Header = () => {
  const theme = useTheme();
  return (
    <header className="sticky mt-4 top-4 z-50 px-2 md:px-4 md:flex justify-center">
      <nav className="border border-border px-4 flex items-center backdrop-filter backdrop-blur-xl bg-opacity-70 h-[50px] z-20 relative gap-20">
        <div className="flex items-center gap-4">
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
            <Link className="text-sm font-medium" href="/blog">
              Blog
            </Link>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2 border-l-[1px] pl-3">
          <Link href={'https://app.helsa.com/sign-in'}>Entrar</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
