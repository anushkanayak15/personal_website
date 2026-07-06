import { LiveDataField } from "@/components/live-data-field/live-data-field";
import { SectionLabel } from "@/components/ui/section-label";
import { KpiStat } from "@/components/ui/kpi-stat";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { ActivityChart } from "@/components/home/activity-chart";
import { SkillsExplorer } from "@/components/home/skills-explorer";
import { AmbientGlow } from "@/components/home/ambient-glow";
import { HeroExperience } from "@/components/home/hero-experience";
import { ScrollStory } from "@/components/home/scroll-story";
import { FeaturedProductsGrid } from "@/components/home/featured-products-grid";
import { HOME_METRICS } from "@/content/metrics";
import { PROFILE } from "@/content/profile";

export default function HomePage() {
  return (
    <div className="relative">
      <LiveDataField />
      <AmbientGlow />

      <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14">
        <HeroExperience />

        <div className="mt-8">
          <ScrollStory />
        </div>

        <div className="mt-8">
          <Reveal>
            <SectionLabel>Featured products</SectionLabel>
          </Reveal>
          <div className="mt-5">
            <FeaturedProductsGrid />
          </div>
        </div>

        {/* KPI dashboard section */}
        <Reveal delay={0.1} className="mt-20">
          <SectionLabel>By the numbers</SectionLabel>
          <Card className="mt-5 grid grid-cols-2 gap-x-6 gap-y-8 p-6 sm:grid-cols-3 lg:grid-cols-6">
            {HOME_METRICS.map((metric) => (
              <KpiStat
                key={metric.label}
                label={metric.label}
                value={metric.value}
                suffix={metric.suffix}
                trend={metric.trend}
                tooltip={metric.tooltip}
                max={metric.max}
              />
            ))}
          </Card>
        </Reveal>

        {/* Skills explorer */}
        <Reveal delay={0.05} className="mt-6">
          <Card className="p-6">
            <h3 className="font-heading text-sm font-medium text-foreground">Systems & stack</h3>
            <p className="text-sm text-muted-foreground">
              Hover a skill to see which real projects used it.
            </p>
            <div className="mt-5">
              <SkillsExplorer />
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.1} className="mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading text-sm font-medium text-foreground">
                  GitHub push activity
                </h3>
                <p className="text-sm text-muted-foreground">
                  Public repo pushes by month
                </p>
              </div>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.7rem] uppercase tracking-wider text-subtle-foreground hover:text-accent"
              >
                @{PROFILE.githubHandle}
              </a>
            </div>
            <ActivityChart />
          </Card>
        </Reveal>
      </div>
    </div>
  );
}
