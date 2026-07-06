"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Boxes, FlaskConical, FileText, Mail, GitCommitHorizontal } from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";
import { StatusPill } from "@/components/ui/status-pill";
import { CommandCard } from "@/components/ui/command-card";
import { FloatingCard } from "@/components/home/floating-card";
import { useLatestCommit } from "@/components/dashboard/use-latest-commit";
import { relativeTime } from "@/lib/relative-time";
import { HOME_METRICS } from "@/content/metrics";
import { PROFILE } from "@/content/profile";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const statusContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const statusItem: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE_OUT } },
};

const headlineContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const headlineLine: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

export function HeroExperience() {
  const { status, commit } = useLatestCommit();
  const projectsMetric = HOME_METRICS[0];

  return (
    <div className="relative">
      {/* system status console */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={statusContainer}
        className="flex flex-wrap items-center gap-x-8 gap-y-3 rounded-xl border border-border bg-card/60 px-5 py-3.5 backdrop-blur-sm"
      >
        <motion.div
          variants={statusItem}
          className="flex items-center gap-2 pr-6 font-mono text-[0.7rem] uppercase tracking-wider text-subtle-foreground sm:border-r sm:border-border"
        >
          <span className="size-1.5 rounded-full bg-accent" />
          System status
        </motion.div>
        <motion.div variants={statusItem}>
          <StatusPill label="Engineer" value="Online" tone="positive" />
        </motion.div>
        <motion.div variants={statusItem}>
          <StatusPill label="Building" value="GrowthOS" tone="active" />
        </motion.div>
        <motion.div variants={statusItem}>
          <StatusPill label="Researching" value="Fairness-Aware ASR" tone="active" />
        </motion.div>
        <motion.div variants={statusItem} className="ml-auto">
          <StatusPill label="Status" value={PROFILE.status} tone="positive" />
        </motion.div>
      </motion.div>

      {/* headline */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={headlineContainer}
        className="relative mt-14 sm:mt-20"
      >
        {/* floating dashboard cards — desktop only, docked in the right gutter clear of text */}
        <FloatingCard
          depth={1.2}
          delay={0.6}
          className="absolute right-0 top-0 hidden w-56 xl:block xl:right-[-2.5rem] 2xl:right-[-4rem]"
        >
          <div className="glass rounded-xl border border-border p-4 shadow-2xl shadow-black/40">
            <div className="flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-subtle-foreground">
              <GitCommitHorizontal className="size-3 text-accent" />
              Latest commit
            </div>
            {status === "success" && commit ? (
              <>
                <p className="mt-2 line-clamp-2 text-sm text-foreground">{commit.message}</p>
                <p className="mt-1 font-mono text-[0.65rem] text-subtle-foreground">
                  {commit.repo} · {relativeTime(commit.createdAt)}
                </p>
              </>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">Syncing with GitHub…</p>
            )}
          </div>
        </FloatingCard>

        <FloatingCard
          depth={1}
          delay={0.78}
          className="absolute right-0 top-[168px] hidden w-44 xl:block xl:right-[-1.5rem] 2xl:right-[-2.5rem]"
        >
          <Link
            href="/products/growthos"
            className="glass block rounded-xl border border-accent/25 p-4 shadow-2xl shadow-black/40 transition-colors hover:border-accent/50"
          >
            <span className="flex items-center gap-1.5">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-[0.65rem] uppercase tracking-wider text-accent">Live</span>
            </span>
            <p className="mt-2 text-sm font-medium text-foreground">GrowthOS</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Evolutionary Conversion Lab</p>
          </Link>
        </FloatingCard>

        <FloatingCard
          depth={1.15}
          delay={0.96}
          className="absolute right-0 top-[320px] hidden w-48 xl:block xl:right-[-3rem] 2xl:right-[-5rem]"
        >
          <div className="glass rounded-xl border border-border p-4 shadow-2xl shadow-black/40">
            <span className="font-mono text-[0.65rem] uppercase tracking-wider text-subtle-foreground">
              {projectsMetric.label}
            </span>
            <p className="mt-1 font-heading text-2xl font-medium text-foreground">
              {projectsMetric.value}
              {projectsMetric.suffix ?? ""}
            </p>
          </div>
        </FloatingCard>

        <motion.div variants={headlineLine}>
          <SectionLabel>AnushkaOS — AI Product Studio</SectionLabel>
        </motion.div>
        <h1 className="mt-5 max-w-3xl text-balance font-heading text-4xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          <motion.span variants={headlineLine} className="block">
            Building AI systems,
          </motion.span>
          <motion.span variants={headlineLine} className="block text-muted-foreground">
            full-stack products,
          </motion.span>
          <motion.span variants={headlineLine} className="block">
            and data-driven software.
          </motion.span>
        </h1>
        <motion.p
          variants={headlineLine}
          className="mt-5 max-w-xl text-balance text-base text-muted-foreground sm:text-lg"
        >
          {PROFILE.tagline}
        </motion.p>
      </motion.div>

      {/* command cards */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12"
      >
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
      </motion.div>
    </div>
  );
}
