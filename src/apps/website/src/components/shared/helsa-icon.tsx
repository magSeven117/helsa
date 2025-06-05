import logo from '@/src/assets/images/HELSA NUEVO BLANCO ISOTIPO.png';
import logoComplete from '@/src/assets/images/HELSA NUEVO BLANCO.png';
import logoBlack from '@/src/assets/images/HELSA NUEVO NEGRO ISOTIPO.png';
import logoCompleteBlack from '@/src/assets/images/HELSA NUEVO NEGRO.png';
import { cn } from '@helsa/ui/lib/utils';
export const HelsaIconLogo = ({ className }: { className?: string }) => {
  return (
    <>
      <img src={logo.src} alt="" className={cn('hidden dark:block w-10', className)} />
      <img src={logoBlack.src} alt="" className={cn('dark:hidden w-10', className)} />
    </>
  );
};

export const HelsaCompleteLogo = ({ className }: { className?: string }) => {
  return (
    <>
      <img src={logoComplete.src} alt="" className={cn('hidden dark:block h-10', className)} />
      <img src={logoCompleteBlack.src} alt="" className={cn('dark:hidden h-10', className)} />
    </>
  );
};
