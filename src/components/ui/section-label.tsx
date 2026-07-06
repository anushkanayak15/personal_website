import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="h-px w-4 bg-accent/60" />
      <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-subtle-foreground">
        {children}
      </span>
    </div>
  );
}
