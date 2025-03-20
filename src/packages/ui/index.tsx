import { ThemeProvider, type ThemeProviderProps } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Toaster } from 'sonner';
import Progress from './components/internal/progress';

type DesignSystemProviderProperties = ThemeProviderProps;

export const DesignSystemProvider = ({ children, ...properties }: DesignSystemProviderProperties) => (
  <NuqsAdapter>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange {...properties}>
      <Progress />
      {children}
      <Toaster />
    </ThemeProvider>
  </NuqsAdapter>
);

export { useTheme } from 'next-themes';
