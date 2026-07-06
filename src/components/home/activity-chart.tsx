"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { GITHUB_MONTHLY_ACTIVITY } from "@/content/github-activity";

export function ActivityChart() {
  return (
    <div className="mt-6 h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={GITHUB_MONTHLY_ACTIVITY} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            interval={1}
            tick={{ fill: "#71717a", fontSize: 10, fontFamily: "var(--font-jetbrains-mono)" }}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
            contentStyle={{
              background: "#111113",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              fontSize: 12,
              fontFamily: "var(--font-jetbrains-mono)",
              color: "#fff",
            }}
            formatter={(value) => [`${value} ${value === 1 ? "repo" : "repos"} pushed`, ""]}
            labelStyle={{ color: "#a1a1aa" }}
          />
          <Bar dataKey="repos" fill="#3ecf8e" radius={[3, 3, 0, 0]} maxBarSize={28} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
