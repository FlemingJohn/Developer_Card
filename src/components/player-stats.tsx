
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, LabelList, Cell } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import * as LucideIcons from 'lucide-react';

interface PlayerStat {
  name: string;
  level: number;
  icon: keyof typeof LucideIcons;
  color: string;
}

interface PlayerStatsProps {
  stats: PlayerStat[];
}

const CustomYAxisTick = ({ y, payload, stats }: any) => {
  const stat = stats.find((s: PlayerStat) => s.name === payload.value);
  if (!stat) return null;

  const Icon = LucideIcons[stat.icon as keyof typeof LucideIcons] as React.ElementType;

  return (
    <g transform={`translate(0,${y})`}>
      <foreignObject x={-12} y={-10} width={130} height={22} className="overflow-visible">
        <div className="flex items-center justify-end gap-2 text-accent text-xs pr-2">
          <span className="truncate text-right">{stat.name}</span>
          {Icon && <Icon className="w-4 h-4" style={{ color: stat.color }} />}
        </div>
      </foreignObject>
    </g>
  );
};

export function PlayerStats({ stats }: PlayerStatsProps) {
  const chartConfig = stats.reduce((acc, stat) => {
    acc[stat.name] = {
      label: stat.name,
      color: stat.color,
    };
    return acc;
  }, {} as any);
  
  return (
    <div>
      <h3 className="text-lg font-headline text-center text-accent mb-4">Core Abilities</h3>
      <ChartContainer config={chartConfig} className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats} layout="vertical" margin={{ left: 20, right: 40, top: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary) / 0.1)" horizontal={true} vertical={false} />
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              axisLine={false}
              tick={<CustomYAxisTick stats={stats} />}
              width={120}
            />
            <Bar dataKey="level" radius={[0, 4, 4, 0]} barSize={20}>
              {stats.map((stat) => (
                <Cell key={stat.name} fill={stat.color} />
              ))}
              <LabelList dataKey="level" position="right" offset={10} className="fill-foreground" fontSize={12} formatter={(value: number) => `${value}%`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
