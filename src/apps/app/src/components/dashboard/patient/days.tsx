import { Card, CardContent, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { HeartPulse } from 'lucide-react';

const RegisterDays = () => {
  return (
    <Card className="rounded-xl ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Dias de registro</CardTitle>
        <HeartPulse />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">12</div>
        <p className="text-xs text-muted-foreground">Consecutivos</p>
      </CardContent>
    </Card>
  );
};

export default RegisterDays;
