import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { SectionLabel } from "@/components/ui/section-label";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { Timeline } from "@/components/experience/timeline";
import { EXPERIENCE, INVOLVEMENT } from "@/content/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Engineering ownership at American Express, Ernst & Young, and Boericke Research Laboratory — framed as product milestones.",
};

export default function ExperiencePage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Experience"
        title="Product milestones"
        description="Three roles, each shipped as a real system rather than a line item — from a production API at American Express to automation pipelines at scale."
      />

      <div className="mt-14">
        <Timeline entries={EXPERIENCE} />
      </div>

      <div className="mt-20">
        <SectionLabel>Leadership & involvement</SectionLabel>
        <Reveal delay={0.05}>
          <Card className="mt-5 divide-y divide-border p-0">
            {INVOLVEMENT.map((item) => (
              <div key={item.organization} className="flex flex-col gap-1.5 p-5 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {item.role} <span className="font-normal text-muted-foreground">· {item.organization}</span>
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                </div>
                <span className="shrink-0 font-mono text-xs text-subtle-foreground">{item.period}</span>
              </div>
            ))}
          </Card>
        </Reveal>
      </div>
    </PageShell>
  );
}
