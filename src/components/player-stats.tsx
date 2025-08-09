
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

interface PlayerStat {
  name: string;
  level: number;
}

interface PlayerStatsProps {
  stats: PlayerStat[];
}

const chartConfig = {
  level: {
    label: "Mastery",
    color: "hsl(var(--primary))",
  },
};

export function PlayerStats({ stats }: PlayerStatsProps) {
  return (
    <div>
      <h3 className="text-lg font-headline text-center text-accent mb-4">Core Abilities</h3>
      <ChartContainer config={chartConfig} className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats} layout="vertical" margin={{ left: 10, right: 40, top: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary) / 0.1)" horizontal={true} vertical={false} />
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'hsl(var(--accent))', fontSize: 12 }}
              width={110}
            />
            <Bar dataKey="level" fill="var(--color-level)" radius={[0, 4, 4, 0]} barSize={20}>
               <LabelList dataKey="level" position="right" offset={10} className="fill-foreground" fontSize={12} formatter={(value: number) => `${value}%`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
