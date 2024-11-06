'use client';

import { Card, CardHeader, CardTitle } from '@/libs/shadcn-ui/components/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/libs/shadcn-ui/components/select';
import { useTheme } from 'next-themes';

export function AppearanceForm() {

  const { setTheme, theme } = useTheme();
  const changeTheme = (theme: string) => {
    setTheme(theme);
  };

  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle>Tema</CardTitle>
        <p className="text-muted-foreground text-sm mt-5">Personaliza la apariencia de la aplicación.</p>
        <Select defaultValue={theme} onValueChange={changeTheme}>
          <SelectTrigger className="rounded-none w-1/2 p-2">
            <SelectValue placeholder="select" />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            <SelectItem value={'light'} className=''>
              Claro
            </SelectItem>
            <SelectItem value={'dark'}>
              Oscuro
            </SelectItem>
            <SelectItem value={'system'}>
              Sistema
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
    </Card>
  );
}
