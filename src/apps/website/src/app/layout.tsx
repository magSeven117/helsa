import '@helsa/ui/styles/global.css';
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
        {children}
      </body>
    </html>
  );
}
