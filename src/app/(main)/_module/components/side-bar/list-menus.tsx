import {
  Calendar,
  CircleDollarSign,
  LayoutDashboard,
  MessagesSquare,
  PieChart,
  Settings,
  Users
} from 'lucide-react';

export interface Section {
  title: string;
  routes: SectionRoute[];
}

export interface SectionRoute {
  icon: React.ReactNode;
  name: string;
  path: string;
}

const doctorRoutes: SectionRoute[] = [
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
];
export const doctorSections: Section[] = [
  {
    title: 'General',
    routes: doctorRoutes,
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
      {
        icon: <Settings className="h-5 w-5 item-icon" />,
        name: 'Settings',
        path: '/settings',
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