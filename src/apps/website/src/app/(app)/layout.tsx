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
  metadataBase: new URL('https://helsahealthcare.com'),
  title: 'Helsa | Therapy and Health Management',
  description: 'Enhance your health with Helsa, a platform for therapy and health management.',
  twitter: {
    title: 'Helsa | Therapy and Health Management',
    description: 'Enhance your health with Helsa, a platform for therapy and health management',
    card: 'summary_large_image',
    images: [
      {
        url: 'https://tfuwarabgmwgumgearac.supabase.co/storage/v1/object/public/stuff//open-graph-image.png',
        width: 800,
        height: 600,
      },
      {
        url: 'https://tfuwarabgmwgumgearac.supabase.co/storage/v1/object/public/stuff//open-graph-image.png',
        width: 1800,
        height: 1600,
      },
    ],
  },
  openGraph: {
    title: 'Helsa | Therapy and Health Management',
    description: 'Enhance your health with Helsa, a platform for therapy and health management.',
    url: 'https://helsahealthcare.com',
    siteName: 'Helsa',
    images: [
      {
        url: 'https://tfuwarabgmwgumgearac.supabase.co/storage/v1/object/public/stuff//open-graph-image.png',
        width: 800,
        height: 600,
      },
      {
        url: 'https://tfuwarabgmwgumgearac.supabase.co/storage/v1/object/public/stuff//open-graph-image.png',
        width: 1800,
        height: 1600,
      },
    ],
  },
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
