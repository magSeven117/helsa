import '@/src/assets/globals.css';
import Footer from '@/src/components/shared/footer';
import Header from '@/src/components/shared/header';
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
      <body className={`${nunito.className} antialiased`} suppressHydrationWarning={true}>
        <DesignSystemProvider defaultTheme="light">
          <div className="min-h-screen bg-background w-full overflow-hidden md:overflow-visible relative">
            <Header />
            {children}
            <Footer />
          </div>
        </DesignSystemProvider>
      </body>
    </html>
  );
}
