'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@helsa/ui/components/chart';
import { TrendingUp } from 'lucide-react';
import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

export const description = 'A donut chart with text';

const chartData = [
  { browser: 'Cita inicial', visitors: 30, fill: 'var(--color-chrome)' },
  { browser: 'Revision', visitors: 27, fill: 'var(--color-safari)' },
  { browser: 'Emergencia', visitors: 53, fill: 'var(--color-firefox)' },
  { browser: 'Control', visitors: 76, fill: 'var(--color-edge)' },
  { browser: 'Cirugía', visitors: 5, fill: 'var(--color-other)' },
];

const chartConfig = {
  visitors: {
    label: 'Citas',
  },
  chrome: {
    label: 'Cita inicial',
    color: 'hsl(var(--chart-1))',
  },
  safari: {
    label: 'Revision',
    color: 'hsl(var(--chart-2))',
  },
  firefox: {
    label: 'Emergencia',
    color: 'hsl(var(--chart-3))',
  },
  edge: {
    label: 'Control',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'Cirugía',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export function AppointmentTypes() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className="flex flex-col rounded-none md:col-span-1">
      <CardHeader className="pb-0 text-left">
        <CardTitle>Tipos de consulta</CardTitle>
        <CardDescription>Enero - Octubre 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="visitors" nameKey="activity" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Citas
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex text-left w-full gap-2 font-medium leading-none">
          Tendencia al alza en un 5.2% este mes <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-left w-full leading-none text-muted-foreground">
          Mostrando el total de visitantes de los últimos 10 meses
        </div>
      </CardFooter>
    </Card>
  );
}
