"use client"

import { buttonVariants } from "@/libs/shadcn-ui/components/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/libs/shadcn-ui/components/tooltip"
import { cn } from "@/libs/shadcn-ui/utils/utils"
import { Bell, Briefcase, KeyRound, LucideIcon, Palette, SlidersHorizontal } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"


interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean
  role: string;
}

export function SidebarNav({ className, role, isCollapsed, ...props }: SidebarNavProps) {
  const pathname = usePathname()
  const items = role === 'DOCTOR' ? doctorSidebarNavItems : []
  return (
    <Nav
    isCollapsed={isCollapsed}
    links={
      items.map((item) => ({
        title: item.title,
        icon: item.icon,
        href: item.href,
        variant: pathname === item.href ? "default" : "ghost",
      }))
    }
    />
  )
}

interface NavProps {
  isCollapsed: boolean
  links: {
    title: string
    label?: string
    icon: LucideIcon
    href: string
    variant: "default" | "ghost",
  }[]
}

export function Nav({ links, isCollapsed }: NavProps) {

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link href={link.href}
  
                  className={cn(
                    buttonVariants({ variant: link.variant, size: "icon" }),
                    "h-9 w-9 cursor-pointer",
                    link.variant === "default" &&
                    "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                  )}
                >
                  <link.icon className="w-4 h-4" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link href={link.href}
              key={index}
              className={cn(
                buttonVariants({ variant: link.variant, size: "sm" }),
                link.variant === "default" &&
                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "justify-start cursor-pointer"
              )}
            >
              <link.icon className="w-4 h-4 mr-2" />
              {link.title}
              {link.label && (
                <span
                  className={cn(
                    "ml-auto",
                    link.variant === "default" &&
                    "text-background dark:text-white"
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>
          )
        )}
      </nav>
    </div>
  )
}

const doctorSidebarNavItems = [
  {
    title: 'Datos personales',
    href: '/profile',
    icon: SlidersHorizontal,
  },
  {
    title: 'Datos profesionales',
    href: '/profile/professional',
    icon: Briefcase,
  },
  {
    title: 'Apariencia',
    href: '/profile/appearance',
    icon: Palette,
  },
  {
    title: 'Notificaciones',
    href: '/profile/notifications',
    icon: Bell,
  },
  {
    title: 'Contraseña y seguridad',
    href: '/profile/security',
    icon: KeyRound,
  },
]