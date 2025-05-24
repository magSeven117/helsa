'use client';
import { Button } from '@helsa/ui/components/button';
import { cn } from '@helsa/ui/lib/utils';
import { useEffect } from 'react';
import { toast as sonnerToast } from 'sonner';
import { ErrorType } from './error';
import { useError } from './index';

export const ErrorToast = () => {
  const { error, setError } = useError();

  useEffect(() => {
    if (error) {
      let level: ErrorType = 'error';
      if (error.status == 400 || error.status == 404) level = 'warning';
      if (error.status == 401 || error.status === 404) level = 'danger';
      if (error.status >= 500) level = 'error';

      sonnerToast.custom(
        (id) => <ErrorToastComponent message={error.message} level={level} title={error.title} action={error.action} />,
        {
          duration: 5000,
        },
      );
      setError(undefined);
    }
  }, [error, setError]);

  return null;
};

export const ErrorToastComponent = ({
  message,
  level,
  title,
  action,
}: {
  message: string;
  level: 'warning' | 'danger' | 'error';
  title: string;
  action?: {
    label: string;
    action: () => void;
    variant?: 'default' | 'outline' | 'secondary';
    icon?: React.ReactNode;
  };
}) => {
  return (
    <div
      className={cn('flex flex-col p-4 gap-3 border rounded-lg shadow-md bg-background', {
        'border-red-500 ': level === 'error',
        'border-orange-500 ': level === 'danger',
        'border-yellow-500 ': level === 'warning',
      })}
    >
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-lg font-bold ">{title}</h1>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-400">{message}</p>
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            className="text-sm text-gray-400 hover:text-gray-600"
            onClick={() => sonnerToast.dismiss()}
          >
            Cerrar
          </Button>
          {action && (
            <Button
              variant={action.variant ?? 'default'}
              className="text-sm gap-2"
              onClick={() => {
                action.action();
                close();
              }}
            >
              {action.icon} {action.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
