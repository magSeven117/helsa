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
  metadataBase: new URL('https://topmedicosintegrales.com'),
  title: 'TopMédicosIntegrales | Terapia y Gestión de Salud Integral',
  description: 'Mejora tu salud con TopMédicosIntegrales, una plataforma integral para terapia y gestión de salud.',
  twitter: {
    title: 'TopMédicosIntegrales | Terapia y Gestión de Salud Integral',
    description: 'Mejora tu salud con TopMédicosIntegrales, una plataforma integral para terapia y gestión de salud',
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
    title: 'TopMédicosIntegrales | Terapia y Gestión de Salud Integral',
    description: 'Mejora tu salud con TopMédicosIntegrales, una plataforma integral para terapia y gestión de salud.',
    url: 'https://topmedicosintegrales.com',
    siteName: 'TopMédicosIntegrales',
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
