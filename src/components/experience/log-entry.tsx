import { Badge } from "@/components/ui/badge";

export interface WorkLog {
  role: string;
  org: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

export function LogEntry({ log, index }: { log: WorkLog; index: number }) {
  return (
    <div className="relative flex gap-5 pb-10 last:pb-0">
      <div className="flex flex-col items-center">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-mono text-[0.65rem] text-accent">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="mt-1 w-px flex-1 bg-border" />
      </div>
      <div className="flex-1 pb-2">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-heading text-base font-medium text-foreground">
            {log.role} <span className="text-muted-foreground">· {log.org}</span>
          </h3>
          <span className="font-mono text-xs text-subtle-foreground">{log.period}</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{log.summary}</p>
        <ul className="mt-3 space-y-1.5">
          {log.highlights.map((point) => (
            <li key={point} className="flex gap-2 text-sm text-muted-foreground">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-subtle-foreground" />
              {point}
            </li>
          ))}
        </ul>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {log.stack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
