import { Card, CardContent, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Clock } from 'lucide-react';

const Glucose = () => {
  return (
    <Card className="rounded-xl ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Ejercicios completados</CardTitle>
        <Clock />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">78%</div>
        <p className="text-xs text-muted-foreground">Esta semana</p>
      </CardContent>
    </Card>
  );
};

export default Glucose;
