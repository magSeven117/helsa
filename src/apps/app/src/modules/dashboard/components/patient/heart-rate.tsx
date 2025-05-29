import { Card, CardContent, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

const HeartRate = () => {
  return (
    <Card className="rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Tendencia de animo</CardTitle>
        <TrendingUp />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-emerald-500 flex items-center gap-2">
          <ArrowUpRight />
          Positiva
        </div>
        <p className="text-xs text-muted-foreground">Esta semana</p>
      </CardContent>
    </Card>
  );
};

export default HeartRate;
