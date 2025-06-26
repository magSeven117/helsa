import '@/public/globals.css';

import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';

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
        {children}
      </body>
    </html>
  );
}
