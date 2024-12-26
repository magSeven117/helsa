'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@helsa/ui/components/chart';
import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

export const description = 'A bar chart';

const chartData = [
  { month: 'Enero', desktop: 186 },
  { month: 'Febrero', desktop: 305 },
  { month: 'Marzo', desktop: 237 },
  { month: 'Abril', desktop: 73 },
  { month: 'Mayo', desktop: 209 },
  { month: 'Junio', desktop: 214 },
  { month: 'Julio', desktop: 128 },
  { month: 'Agosto', desktop: 345 },
  { month: 'Septiembre', desktop: 64 },
  { month: 'Octubre', desktop: 186 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function Revenue() {
  return (
    <Card className="rounded-none md:col-span-1">
      <CardHeader>
        <CardTitle>Ganancia por mes</CardTitle>
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
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Tendencia al alza en un 5.2% este mes <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando el total de visitantes de los últimos 6 meses
        </div>
      </CardFooter>
    </Card>
  );
}
