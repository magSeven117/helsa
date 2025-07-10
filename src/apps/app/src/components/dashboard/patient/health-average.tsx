'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@helsa/ui/components/chart';
import { format } from 'date-fns';
import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

export const description = 'A bar chart';

interface HealthAverageChartData {
  date: string; // ISO date string (YYYY-MM-DD)
  rate: number; // 1-5
}

const chartData: HealthAverageChartData[] = [
  { date: '2024-01-15', rate: 3 },
  { date: '2024-02-12', rate: 4 },
  { date: '2024-03-10', rate: 2 },
  { date: '2024-04-18', rate: 5 },
  { date: '2024-05-09', rate: 3 },
  { date: '2024-06-21', rate: 4 },
  { date: '2024-07-05', rate: 2 },
  { date: '2024-08-14', rate: 5 },
  { date: '2024-09-03', rate: 1 },
  { date: '2024-10-11', rate: 3 },
];

const chartConfig = {
  rate: {
    label: 'Promedio',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function HealthAverage() {
  return (
    <Card className="rounded-xl col-span-1">
      <CardHeader>
        <CardTitle>Promedio de animo por dia</CardTitle>
        <CardDescription>Enero - Octubre 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => format(new Date(value), 'dd/MM')}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="rate" fill="var(--color-brand-primary)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Tendencia al alza en un 5.2% este mes <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">Mostrando el promedio de tu progreso en salud mental</div>
      </CardFooter>
    </Card>
  );
}
