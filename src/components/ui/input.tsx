import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      className={cn(
        "h-10 w-full rounded-lg border border-border bg-white/[0.02] px-3.5 text-sm text-foreground placeholder:text-subtle-foreground outline-none transition-colors focus-visible:border-accent/50 focus-visible:ring-2 focus-visible:ring-accent/20",
        className
      )}
      {...props}
    />
  );
}

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-32 w-full resize-none rounded-lg border border-border bg-white/[0.02] px-3.5 py-3 text-sm text-foreground placeholder:text-subtle-foreground outline-none transition-colors focus-visible:border-accent/50 focus-visible:ring-2 focus-visible:ring-accent/20",
        className
      )}
      {...props}
    />
  );
}

export { Input, Textarea };
