import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Tooltip({
  content,
  children,
  className,
}: {
  content: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("group/tooltip relative inline-flex", className)}>
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute -top-2 left-1/2 z-10 w-max max-w-[220px] -translate-x-1/2 -translate-y-full rounded-md border border-border bg-card px-2.5 py-1.5 text-center font-mono text-[0.65rem] text-muted-foreground opacity-0 shadow-lg transition-opacity duration-150 group-hover/tooltip:opacity-100"
      >
        {content}
      </span>
    </span>
  );
}
