import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export type HandledError = {
  title: string;
  message: string;
  status: number;
  type: string;
  action?: {
    label: string;
    action: () => void;
    variant?: 'default' | 'outline' | 'secondary';
    icon?: React.ReactNode;
  };
};
export type ErrorType = 'warning' | 'danger' | 'error';

export const severityConfig = {
  error: {
    icon: AlertCircle,
    bgColor: 'bg-red-50 dark:bg-red-950/20',
    borderColor: 'border-red-200 dark:border-red-800',
    iconColor: 'text-red-600 dark:text-red-400',
    badgeVariant: 'destructive' as const,
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
    badgeVariant: 'secondary' as const,
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    iconColor: 'text-blue-600 dark:text-blue-400',
    badgeVariant: 'secondary' as const,
  },
  success: {
    icon: CheckCircle,
    bgColor: 'bg-green-50 dark:bg-green-950/20',
    borderColor: 'border-green-200 dark:border-green-800',
    iconColor: 'text-green-600 dark:text-green-400',
    badgeVariant: 'secondary' as const,
  },
};
