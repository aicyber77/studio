'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

interface SustainabilityChartProps {
  data: {
    date: string;
    points: number;
  }[];
}

const chartConfig = {
  points: {
    label: 'Points',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function SustainabilityChart({ data }: SustainabilityChartProps) {
  if (data.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
       <h4 className="font-semibold mb-2 text-muted-foreground">Points Earned Over Time</h4>
       <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value}
          />
          <YAxis tickLine={false} axisLine={false} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Bar dataKey="points" fill="var(--color-points)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
