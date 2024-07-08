'use client'
import {
  Calendar, ChevronLeft, ChevronRight, CircleDollarSign,
  LayoutDashboard,
  MessagesSquare,
  PieChart,
  Users
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from 'react';
import styles from './style.module.css';

export interface Section {
  title: string;
  routes: SectionRoute[];
}

export interface SectionRoute {
  icon: React.ReactNode;
  name: string;
  path: string;
}


const SideBar = ({ role }: { role: string }) => {
  const [sections, _] = useState(role === 'DOCTOR' ? doctorSections : patientSections);
  const [open, setOpen] = useState(true);
  const pathName = usePathname();
  return (
    <div className={styles.sidebar_container + ` ${open ? '' : styles.closed}` }>
      <div className={styles.sidebar_main + ` ${open ? '' : styles.closed}` + ' no-scroll'}>
        <div className={styles.sidebar_button + ` ${open ? '' : styles.closed}`} onClick={()=> setOpen((current) => !current)}>
          <div className={styles.sidebar_button_2}>
            {
              open ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
            }
          </div>
        </div>
        <Link href={'/'} className={styles.sidebar_brand + ` ${open ? '' : styles.closed}`}>
          <img src="/images/logo-simple.png" alt="" className={styles.sidebar_brand_image + ` ${open ? '' : styles.closed}`} />
          {
            open && <p className={styles.sidebar_brand_text}>Helsa</p>
          }
        </Link>
        <div className={styles.topbar_sidebar_sections}>
          {sections.map((section, index) => (
            <div key={section.title}>
              <p className={styles.sidebar_section_title + ` ${open ? '' : styles.closed}`}>{section.title}</p>
              <div className={styles.sidebar_section_content}>
                {section.routes.map((route, index) => (
                  <Link href={route.path} key={index} className={
                    `${styles.sidebar_section_item} ${pathName.includes(route.path) ? styles.active : ''}`
                  } >
                    <div className={`${pathName.includes(route.path) ? styles.item_icon : ''}`}>
                      {route.icon}
                    </div>
                    {open && <p className={styles.sidebar_section_item_text}>{route.name}</p>}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;

export const doctorSections: Section[] = [
  {
    title: 'General',
    routes: [
      {
        icon: <LayoutDashboard className="w-5 h-5 item-icon" />,
        name: 'Dashboard',
        path: '/doctor/dashboard',
      },
      {
        icon: <Calendar className="w-5 h-5 item-icon" />,
        name: 'Schedule',
        path: '/doctor/schedule',
      },
      {
        icon: <Users className="w-5 h-5 item-icon" />,
        name: 'Patients',
        path: '/doctor/patients',
      },
      {
        icon: <PieChart className="w-5 h-5 item-icon" />,
        name: 'Statistics & Reports',
        path: '/doctor/patients',
      },
    ],
  },
  {
    title: 'Tools',
    routes: [
      {
        icon: <MessagesSquare className="h-5 w-5 item-icon" />,
        name: 'Chats & calls',
        path: '/doctor/chats',
      },
      {
        icon: <CircleDollarSign className="h-5 w-5 item-icon" />,
        name: 'Billings',
        path: '/doctor/billing',
      },
    ],
  },
];
export const patientSections: Section[] = [
  {
    title: 'General',
    routes: [
      {
        icon: <LayoutDashboard className="w-5 h-5 item-icon" />,
        name: 'Dashboard',
        path: '/patient/dashboard',
      },
    ]
  }
]