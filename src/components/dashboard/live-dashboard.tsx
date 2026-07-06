"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLatestCommit } from "./use-latest-commit";
import { relativeTime } from "@/lib/relative-time";
import { PROFILE } from "@/content/profile";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-mono text-[0.65rem] uppercase tracking-wider text-subtle-foreground">
        {label}
      </span>
      {children}
    </div>
  );
}

export function LiveDashboard() {
  const { status, commit } = useLatestCommit();

  return (
    <aside className="hidden shrink-0 2xl:block">
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-20 w-64 space-y-5 rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm"
      >
        <div className="flex items-center gap-2 border-b border-border pb-3">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-[0.7rem] uppercase tracking-wider text-subtle-foreground">
            Live Workspace
          </span>
        </div>

        <Field label="Current Build">
          <Link href="/products/growthos" className="text-sm text-foreground hover:text-accent">
            GrowthOS
          </Link>
        </Field>

        <Field label="Now Exploring">
          <span className="text-sm text-foreground">AI Evaluation Systems</span>
        </Field>

        <Field label="Latest Focus">
          <span className="text-sm text-foreground">Product Research + AI Tools</span>
        </Field>

        <Field label="Latest Commit">
          {status === "loading" && (
            <div className="space-y-1.5">
              <div className="h-3 w-3/4 animate-pulse rounded bg-white/[0.06]" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-white/[0.06]" />
            </div>
          )}
          {status === "error" && (
            <Link
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-accent"
            >
              View on GitHub
              <ArrowUpRight className="size-3" />
            </Link>
          )}
          {status === "success" && commit && (
            <Link href={commit.url} target="_blank" rel="noopener noreferrer" className="group block">
              <p className="line-clamp-2 text-sm text-foreground group-hover:text-accent">
                {commit.message}
              </p>
              <p className="mt-1 font-mono text-[0.7rem] text-subtle-foreground">
                {commit.repo} · {relativeTime(commit.createdAt)}
              </p>
            </Link>
          )}
        </Field>

        <Field label="Tech Stack">
          <div className="flex flex-wrap gap-1.5">
            {["TypeScript", "Python", "Next.js", "PyTorch"].map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[0.65rem] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </Field>

        <Field label="Recent Thought">
          <p className="text-sm italic text-muted-foreground">
            &ldquo;Explainable beats accurate when a system has to convince a human.&rdquo;
          </p>
        </Field>

        <div className="border-t border-border pt-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wide text-accent">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            {PROFILE.status}
          </span>
        </div>
      </motion.div>
    </aside>
  );
}
