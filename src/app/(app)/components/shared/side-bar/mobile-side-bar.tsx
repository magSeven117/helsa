'use client'
import { Button } from '@/libs/shadcn-ui/components/button';
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from '@/libs/shadcn-ui/components/sheet';
import { useUser } from '@clerk/nextjs';
import { Menu, Sheet } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { doctorSections, patientSections } from './side-bar';
import styles from './style.module.css';

const MobileSideBar = () => {
  const pathName = usePathname();
  const user = useUser();
  const [sections, _] = useState(user?.user?.publicMetadata?.role === 'DOCTOR' ? doctorSections : patientSections);
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className={styles.topbar_button_sidebar}>
            <Menu className={styles.topbar_button_icon_sidebar} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-foreground border-none">
          <SheetHeader>
            <div className="w-full flex justify-center items-center gap-3">
              <img src="/images/logo-simple.png" alt="" className="h-[30px]" />
              <p className="text-primary font-bold">Helsa</p>
            </div>
          </SheetHeader>
          <div className={styles.topbar_sidebar_sections}>
          {sections.map((section, index) => (
            <div key={section.title}>
              <p className={styles.topbar_sidebar_section_title}>{section.title}</p>
              <div className={styles.topbar_sidebar_section_content}>
                {section.routes.map((route, index) => (
                  <Link href={route.path} key={index} className={
                    `${styles.topbar_sidebar_section_item} ${pathName.includes(route.path) ? styles.active : ''}`
                  } >
                    <div className={`${pathName.includes(route.path) ? styles.item_icon : ''}`}>
                      {route.icon}
                    </div>
                    <p className={styles.sidebar_section_item_text}>{route.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
          <SheetDescription></SheetDescription>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSideBar;
