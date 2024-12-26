'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@helsa/ui/components/chart';
import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

export const description = 'A bar chart';

const chartData = [
  { month: 'Enero', rate: 186 },
  { month: 'Febrero', rate: 305 },
  { month: 'Marzo', rate: 237 },
  { month: 'Abril', rate: 73 },
  { month: 'Mayo', rate: 209 },
  { month: 'Junio', rate: 214 },
  { month: 'Julio', rate: 128 },
  { month: 'Agosto', rate: 345 },
  { month: 'Septiembre', rate: 64 },
  { month: 'Octubre', rate: 186 },
];

const chartConfig = {
  rate: {
    label: 'Promedio',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function HealthAverage() {
  return (
    <Card className="rounded-none col-span-1">
      <CardHeader>
        <CardTitle>Promedio de salud por mes</CardTitle>
        <CardDescription>Enero - Octubre 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
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
        <div className="leading-none text-muted-foreground">Mostrando el promedio de tu progreso en salud</div>
      </CardFooter>
    </Card>
  );
}
