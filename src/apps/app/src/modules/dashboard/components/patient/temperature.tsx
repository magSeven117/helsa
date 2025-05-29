import { Card, CardContent, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Activity } from 'lucide-react';

const Temperature = () => {
  return (
    <Card className="rounded-xl ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Progreso general</CardTitle>
        <Activity />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">65%</div>
        <p className="text-xs text-muted-foreground">Plan de tratamiento</p>
      </CardContent>
    </Card>
  );
};

export default Temperature;
