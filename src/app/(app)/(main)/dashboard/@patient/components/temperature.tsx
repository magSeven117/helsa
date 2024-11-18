import { Card, CardContent, CardHeader, CardTitle } from '@/libs/shadcn-ui/components/card';
import { Thermometer } from 'lucide-react';

const Temperature = () => {
  return (
    <Card className="rounded-none w-1/4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-medium">35 ° C</CardTitle>
        <Thermometer />
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">Temperatura</p>
      </CardContent>
    </Card>
  );
};

export default Temperature;
