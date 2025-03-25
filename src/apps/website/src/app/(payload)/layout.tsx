import '@/src/assets/globals.css';
import icon from '@/src/assets/images/Helsa Logo black - white.png';
import Header from '@/src/components/atoms/header';
import Footer from '@/src/components/footer';
import { DesignSystemProvider } from '@helsa/ui';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Helsa',
  description: 'Healthcare for everyone',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <link rel="icon" href={icon.src} sizes="any" />
      <body className={`${nunito.className} antialiased`} suppressHydrationWarning={true}>
        <DesignSystemProvider>
          <div className="min-h-screen bg-background container mx-auto px-4 overflow-hidden md:overflow-visible relative">
            <Header />
            {children}
            <Footer />
          </div>
        </DesignSystemProvider>
      </body>
    </html>
  );
}
