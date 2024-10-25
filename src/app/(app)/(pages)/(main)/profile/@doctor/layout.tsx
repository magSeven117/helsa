import { SidebarNav } from '@/app/(app)/components/profile/new/side-bar-nav';
import { Separator } from '@/libs/shadcn-ui/components/separator';
import { Bell, Briefcase, KeyRound, Palette, User } from 'lucide-react';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Helsa | Perfil",
  description: "Actualiza tus datos personales, preferencias de notificación y más.",
}

const sidebarNavItems = [
  {
    title: "Datos personales",
    href: "/profile",
    icon: <User className='size-4'/>
  },
  {
    title: "Datos profesionales",
    href: "/profile/professional",
    icon: <Briefcase className='size-4'/>
  },
  {
    title: "Apariencia",
    href: "/profile/appearance",
    icon: <Palette className='size-4'/>
  },
  {
    title: "Notificaciones",
    href: "/profile/notifications",
    icon: <Bell className='size-4'/>
  },
  {
    title: "Contraseña y seguridad",
    href: "/profile/security",
    icon: <KeyRound className='size-4'/>
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
