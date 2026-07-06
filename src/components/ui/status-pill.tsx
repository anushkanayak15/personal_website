import { cn } from "@/lib/utils";

type StatusTone = "positive" | "active" | "neutral";

const TONE_STYLES: Record<StatusTone, string> = {
  positive: "bg-accent",
  active: "bg-accent-secondary",
  neutral: "bg-subtle-foreground",
};

export function StatusPill({
  label,
  value,
  tone = "positive",
  pulse = true,
  className,
}: {
  label: string;
  value: string;
  tone?: StatusTone;
  pulse?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span className="relative flex size-1.5 shrink-0">
        {pulse && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-60",
              TONE_STYLES[tone]
            )}
          />
        )}
        <span
          className={cn(
            "relative inline-flex size-1.5 rounded-full",
            TONE_STYLES[tone]
          )}
        />
      </span>
      <span className="font-mono text-[0.7rem] uppercase tracking-wider text-subtle-foreground">
        {label}
      </span>
      <span className="font-mono text-[0.7rem] text-muted-foreground">
        {value}
      </span>
    </div>
  );
}
