"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

const DATA = Array.from({ length: 12 }, (_, i) => ({
  week: `W${i + 1}`,
  value: Math.round(20 + Math.sin(i / 1.6) * 14 + i * 2.2 + Math.random() * 8),
}));

export function ActivityChart() {
  return (
    <div className="mt-6 h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={DATA} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="activityFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3ecf8e" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#3ecf8e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="week"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#71717a", fontSize: 11, fontFamily: "var(--font-jetbrains-mono)" }}
          />
          <Tooltip
            cursor={{ stroke: "#27272a", strokeWidth: 1 }}
            contentStyle={{
              background: "#111113",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              fontSize: 12,
              fontFamily: "var(--font-jetbrains-mono)",
              color: "#fff",
            }}
            labelStyle={{ color: "#a1a1aa" }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3ecf8e"
            strokeWidth={2}
            fill="url(#activityFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
