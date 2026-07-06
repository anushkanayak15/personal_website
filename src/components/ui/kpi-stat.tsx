"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface KpiStatProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  trend?: string;
  tooltip?: string;
  max?: number;
  className?: string;
}

export function KpiStat({
  label,
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  trend,
  tooltip,
  max,
  className,
}: KpiStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);
  const progressTarget = max ? Math.min(100, (value / max) * 100) : 0;

  useEffect(() => {
    if (!inView) return;
    const duration = reduceMotion ? 0 : 900;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, reduceMotion]);

  return (
    <div
      ref={ref}
      tabIndex={tooltip ? 0 : undefined}
      className={cn(
        "group/kpi flex cursor-default flex-col gap-1.5 rounded-lg p-2 -m-2 outline-none transition-colors duration-200 hover:bg-white/[0.03] focus-visible:bg-white/[0.03]",
        className
      )}
    >
      <span className="font-mono text-[0.7rem] uppercase tracking-wider text-subtle-foreground">
        {label}
      </span>
      <div className="flex items-baseline gap-2">
        <span className="font-heading text-3xl font-medium tabular-nums text-foreground sm:text-4xl">
          {prefix}
          {display.toFixed(decimals)}
          {suffix}
        </span>
        {trend && <span className="font-mono text-xs text-accent">{trend}</span>}
      </div>

      {max && (
        <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${progressTarget}%` } : { width: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="h-full rounded-full bg-accent"
          />
        </div>
      )}

      {tooltip && (
        <p className="grid grid-rows-[0fr] text-xs leading-snug text-subtle-foreground opacity-0 transition-all duration-300 group-hover/kpi:grid-rows-[1fr] group-hover/kpi:opacity-100 group-focus-visible/kpi:grid-rows-[1fr] group-focus-visible/kpi:opacity-100">
          <span className="overflow-hidden">{tooltip}</span>
        </p>
      )}
    </div>
  );
}
