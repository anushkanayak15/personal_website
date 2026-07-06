import { Boxes, FlaskConical, FileText, Mail } from "lucide-react";
import { LiveDataField } from "@/components/live-data-field/live-data-field";
import { StatusPill } from "@/components/ui/status-pill";
import { SectionLabel } from "@/components/ui/section-label";
import { CommandCard } from "@/components/ui/command-card";
import { KpiStat } from "@/components/ui/kpi-stat";
import { Card } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip";
import { Reveal } from "@/components/motion/reveal";
import { ActivityChart } from "@/components/home/activity-chart";
import { SkillsExplorer } from "@/components/home/skills-explorer";
import { HOME_METRICS } from "@/content/metrics";
import { PROFILE } from "@/content/profile";

export default function HomePage() {
  return (
    <div className="relative">
      <LiveDataField />

      <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14">
        {/* system status bar */}
        <Reveal>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 rounded-xl border border-border bg-card/60 px-5 py-3.5 backdrop-blur-sm">
            <div className="flex items-center gap-2 pr-6 font-mono text-[0.7rem] uppercase tracking-wider text-subtle-foreground sm:border-r sm:border-border">
              <span className="size-1.5 rounded-full bg-accent" />
              System status
            </div>
            <StatusPill label="Engineer" value="Online" tone="positive" />
            <StatusPill label="Building" value="GrowthOS" tone="active" />
            <StatusPill label="Researching" value="Fairness-Aware ASR" tone="active" />
            <StatusPill
              label="Status"
              value={PROFILE.status}
              tone="positive"
              className="ml-auto"
            />
          </div>
        </Reveal>

        {/* headline */}
        <Reveal delay={0.05} className="mt-14 sm:mt-20">
          <SectionLabel>AnushkaOS — AI Product Studio</SectionLabel>
          <h1 className="mt-5 max-w-3xl text-balance font-heading text-4xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Building AI systems,{" "}
            <span className="text-muted-foreground">full-stack products,</span>{" "}
            and data-driven software.
          </h1>
          <p className="mt-5 max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
            {PROFILE.tagline}
          </p>
        </Reveal>

        {/* command cards */}
        <Reveal delay={0.1} className="mt-12">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <CommandCard
              href="/products"
              icon={<Boxes strokeWidth={1.75} />}
              title="View Products"
              description="Shipped and in-progress builds"
              shortcut="P"
            />
            <CommandCard
              href="/research"
              icon={<FlaskConical strokeWidth={1.75} />}
              title="Research"
              description="Model cards & experiments"
              shortcut="R"
            />
            <CommandCard
              href={PROFILE.resumeUrl}
              icon={<FileText strokeWidth={1.75} />}
              title="Resume"
              description="Download the one-pager"
              shortcut="⌘R"
            />
            <CommandCard
              href="/contact"
              icon={<Mail strokeWidth={1.75} />}
              title="Contact"
              description="Open a channel"
              shortcut="C"
            />
          </div>
        </Reveal>

        {/* KPI dashboard section */}
        <Reveal delay={0.15} className="mt-20">
          <SectionLabel>By the numbers</SectionLabel>
          <Card className="mt-5 grid grid-cols-2 gap-6 p-6 sm:grid-cols-3 lg:grid-cols-6">
            {HOME_METRICS.map((metric) => (
              <Tooltip key={metric.label} content={metric.tooltip} className="block">
                <KpiStat
                  label={metric.label}
                  value={metric.value}
                  suffix={metric.suffix}
                  trend={metric.trend}
                  className="cursor-default"
                />
              </Tooltip>
            ))}
          </Card>
        </Reveal>

        {/* Skills explorer */}
        <Reveal delay={0.18} className="mt-6">
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

        <Reveal delay={0.2} className="mt-6">
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
