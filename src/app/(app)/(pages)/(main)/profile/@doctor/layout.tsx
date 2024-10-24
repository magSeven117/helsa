import { SidebarNav } from '@/app/(app)/components/profile/new/side-bar-nav';
import { Separator } from '@/libs/shadcn-ui/components/separator';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
}

const sidebarNavItems = [
  {
    title: "Datos personales",
    href: "/profile",
  },
  {
    title: "Datos de contacto y profesionales",
    href: "/profile/account",
  },
  {
    title: "Appearance",
    href: "/profile/appearance",
  },
  {
    title: "Notifications",
    href: "/profile/notifications",
  },
  {
    title: "Display",
    href: "/profile/display",
  },
]

const Layout = ({ children }) => {
  return (
    <div className="space-y-6 p-10 pb-16 w-full">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Configuraciones de cuenta</h2>
        <p className="text-muted-foreground">
          Actualiza tus datos personales, preferencias de notificación y más.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} className='max-md:max-w-[400px] max-md:overflow-x-scroll no_scroll no-scroll'/>
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
