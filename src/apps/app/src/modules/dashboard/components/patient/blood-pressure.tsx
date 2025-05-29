import { Card, CardContent, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Calendar } from 'lucide-react';

const BloodPressure = () => {
  return (
    <Card className="rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Asistencia a citas</CardTitle>
        <Calendar />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">92%</div>
        <p className="text-xs text-muted-foreground">Últimos 3 meses</p>
      </CardContent>
    </Card>
  );
};

export default BloodPressure;
