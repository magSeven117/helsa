import './globals.css';

import { DesignSystemProvider } from '@helsa/ui';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { ErrorProvider } from '../components/error';
import { ErrorToast } from '../components/error/error-toast';
import { QueryProvider } from '../components/shared/query-provider';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Helsa',
  description: 'A platform for managing your health',
  openGraph: {
    title: 'Helsa',
    description: 'A platform for managing your health',
    url: 'https://helsahealthcare.com',
    siteName: 'Helsa',
    images: [{ url: 'https://example.com/og.png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={nunito.className + ' styled-scroll h-screen box-border'} suppressHydrationWarning={true}>
        <DesignSystemProvider>
          <ErrorProvider>
            <ErrorToast />
            <QueryProvider>{children}</QueryProvider>
          </ErrorProvider>
        </DesignSystemProvider>
      </body>
    </html>
  );
}
