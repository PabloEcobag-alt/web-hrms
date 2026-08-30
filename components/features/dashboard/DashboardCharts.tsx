"use client";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export interface ChartDatum {
  name: string;
  value: number;
}

// Varied multi-hue palette for pie/donut slices.
const PIE_COLORS = [
  "#8b5cf6", // violet
  "#0ea5e9", // sky
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#ec4899", // pink
  "#14b8a6", // teal
  "#6366f1", // indigo
  "#f97316", // orange
  "#84cc16", // lime
];

function ChartCard({ title, subtitle, children }: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-border rounded-lg bg-white shadow-xs p-4 md:p-5">
      <div className="mb-3">
        <h3 className="text-sm md:text-base font-semibold m-0 text-foreground">{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {children as any}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/** Vertical bar chart with a violet vertical gradient fill. */
export function BarChartCard({ title, subtitle, data, gradientId = "violetBar" }: {
  title: string;
  subtitle?: string;
  data: ChartDatum[];
  gradientId?: string;
  /** kept for backward compatibility; ignored in favor of the violet gradient. */
  barColor?: string;
}) {
  return (
    <ChartCard title={title} subtitle={subtitle}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity={1} />
            <stop offset="100%" stopColor="#6d28d9" stopOpacity={1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#eef0f2" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6b7280" }} interval={0} angle={-12} textAnchor="end" height={48} />
        <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#6b7280" }} />
        <Tooltip cursor={{ fill: "#f5f3ff" }} contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} />
        <Bar dataKey="value" name="Count" fill={`url(#${gradientId})`} radius={[6, 6, 0, 0]} maxBarSize={48} />
      </BarChart>
    </ChartCard>
  );
}

/** Donut/pie chart with a varied multi-hue palette. */
export function PieChartCard({ title, subtitle, data }: {
  title: string;
  subtitle?: string;
  data: ChartDatum[];
}) {
  return (
    <ChartCard title={title} subtitle={subtitle}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={2}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ChartCard>
  );
}
