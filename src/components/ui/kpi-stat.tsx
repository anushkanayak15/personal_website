"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface KpiStatProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  trend?: string;
  className?: string;
}

export function KpiStat({
  label,
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  trend,
  className,
}: KpiStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

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
    <div ref={ref} className={cn("flex flex-col gap-1.5", className)}>
      <span className="font-mono text-[0.7rem] uppercase tracking-wider text-subtle-foreground">
        {label}
      </span>
      <div className="flex items-baseline gap-2">
        <span className="font-heading text-3xl font-medium tabular-nums text-foreground sm:text-4xl">
          {prefix}
          {display.toFixed(decimals)}
          {suffix}
        </span>
        {trend && (
          <span className="font-mono text-xs text-accent">{trend}</span>
        )}
      </div>
    </div>
  );
}
