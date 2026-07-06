import { Card } from "@/components/ui/card";
import { KpiStat } from "@/components/ui/kpi-stat";
import { TRIP_STATS } from "@/content/about";

export function TripStats() {
  return (
    <Card className="grid grid-cols-2 gap-x-6 gap-y-8 p-6 sm:grid-cols-3">
      {TRIP_STATS.map((stat) => (
        <KpiStat
          key={stat.label}
          label={stat.label}
          value={stat.value}
          suffix={stat.suffix}
          tooltip={stat.tooltip}
          max={stat.max}
        />
      ))}
    </Card>
  );
}
