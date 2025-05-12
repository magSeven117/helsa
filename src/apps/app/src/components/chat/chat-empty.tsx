import logo from '@/src/assets/images/HELSA NUEVO BLANCO ISOTIPO.png';
import logo2 from '@/src/assets/images/HELSA NUEVO NEGRO ISOTIPO.png';
import { useTheme } from 'next-themes';

type Props = {
  firstName: string;
};

export function ChatEmpty({ firstName }: Props) {
  const theme = useTheme();
  return (
    <div className="w-full mt-[200px] todesktop:mt-24 md:mt-24 flex flex-col items-center justify-center text-center">
      <div className="size-16">
        {theme.theme === 'dark' || theme.theme === 'system' ? (
          <img src={logo.src} alt="" className="rounded-lg" />
        ) : (
          <img src={logo2.src} alt="" className="rounded-lg" />
        )}
      </div>
      <span className="font-medium text-xl mt-6">Hola {firstName}, ¿como puedo ayudarte hoy?</span>
    </div>
  );
}
