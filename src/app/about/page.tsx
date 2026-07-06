import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { SectionLabel } from "@/components/ui/section-label";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { AboutHero } from "@/components/about/about-hero";
import { InterestGrid } from "@/components/about/interest-grid";
import { TripStory } from "@/components/about/trip-story";
import { TripStats } from "@/components/about/trip-stats";

export const metadata: Metadata = {
  title: "About",
  description:
    "Off the clock: travel, cafés, Formula 1, and a completely self-imposed plan to solo backpack the South of France.",
};

export default function AboutPage() {
  return (
    <PageShell>
      <AboutHero />

      <div className="mt-16">
        <Reveal>
          <SectionLabel>What I&apos;m into</SectionLabel>
        </Reveal>
        <div className="mt-5">
          <InterestGrid />
        </div>
      </div>

      <div className="mt-20">
        <Reveal>
          <SectionLabel>The grand (entirely self-imposed) plan</SectionLabel>
        </Reveal>
        <TripStory />
      </div>

      <div className="mt-4">
        <Reveal>
          <SectionLabel>Trip stats</SectionLabel>
        </Reveal>
        <div className="mt-5">
          <TripStats />
        </div>
      </div>

      <Reveal delay={0.05} className="mt-8">
        <Card className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">
            Café recommendations, F1 opinions, and general chit-chat welcome.
          </p>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
          >
            Say hi
            <ArrowUpRight className="size-3.5" />
          </Link>
        </Card>
      </Reveal>
    </PageShell>
  );
}
