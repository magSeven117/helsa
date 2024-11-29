'use client';
import { Action, KBarAnimator, KBarPortal, KBarPositioner, KBarProvider, KBarSearch } from 'kbar';
import { useRouter } from 'next/navigation';
import RenderResults from './render-results';

export default function KBar({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const actions: Action[] = [
    {
      id: 'bookAction',
      name: 'Book',
      shortcut: ['g', 'b'],
      keywords: 'inbox',
      section: 'Navigation',
      subtitle: 'View your inbox',
      perform: () => {
        router.push('/book');
      },
    },
    {
      id: 'scheduleAction',
      name: 'Schedule',
      shortcut: ['g', 't'],
      keywords: 'inbox',
      section: 'Navigation',
      subtitle: 'View your inbox',
      perform: () => {
        router.push('/book');
      },
    },
  ];
  return (
    <KBarProvider actions={actions}>
      <ActualComponent>{children}</ActualComponent>
    </KBarProvider>
  );
}

const ActualComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <KBarPortal>
        <KBarPositioner className="fixed inset-0 bg-bac dark:bg-black/60 backdrop-blur-sm scrollbar-hide !p-0 z-[99999]">
          <KBarAnimator className="max-w-[600px] !mt-64 w-full bg-background dark:background text-foreground dark:text-gray-200 shadow-none border dark:border-sidebar rounded-none overflow-hidden relative !-translate-y-12">
            <div className="bg-background">
              <div className="border-x-0 border-b-2 dark:sidebar">
                <KBarSearch className="py-4 px-6 text-lg w-full bg-background outline-none border-none focus:outline-none focus:ring-0 focus:ring-offset-0" />
              </div>
              <RenderResults />
            </div>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </>
  );
};
