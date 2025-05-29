'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@helsa/ui/components/chart';
import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

export const description = 'A bar chart';

const chartData = [
  { month: 'Enero', desktop: 2 },
  { month: 'Febrero', desktop: 3 },
  { month: 'Marzo', desktop: 5 },
  { month: 'Abril', desktop: 4.5 },
  { month: 'Mayo', desktop: 5 },
  { month: 'Junio', desktop: 4.2 },
  { month: 'Julio', desktop: 5 },
  { month: 'Agosto', desktop: 1 },
  { month: 'Septiembre', desktop: 3.6 },
  { month: 'Octubre', desktop: 5 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export function Revenue() {
  return (
    <Card className="lg:col-span-1 rounded-lg border shadow-none">
      <CardHeader>
        <CardTitle>Satisfacción por mes</CardTitle>
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
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={10} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Tendencia al alza en un 5.2% este mes <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando el promedio de satisfacción de los pacientes de los últimos 6 meses
        </div>
      </CardFooter>
    </Card>
  );
}
