import type { ReactNode } from "react";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/motion/reveal";

export function SectionBlock({
  label,
  children,
  delay = 0,
}: {
  label: string;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="mt-14 first:mt-0">
      <SectionLabel>{label}</SectionLabel>
      <div className="mt-4">{children}</div>
    </Reveal>
  );
}
