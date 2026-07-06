"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MouseEvent, ReactNode } from "react";

interface CommandCardProps {
  href: string;
  icon: ReactNode;
  title: string;
  description: string;
  shortcut?: string;
  className?: string;
}

export function CommandCard({
  href,
  icon,
  title,
  description,
  shortcut,
  className,
}: CommandCardProps) {
  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={cn("group relative", className)}
    >
      <Link
        href={href}
        onMouseMove={handleMouseMove}
        className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border border-border bg-card p-5 transition-colors duration-200 hover:border-border-hover hover:bg-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(180px circle at var(--x, 50%) var(--y, 0%), color-mix(in oklch, var(--accent), transparent 88%), transparent 70%)",
          }}
        />
        <div className="flex items-start justify-between">
          <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-white/[0.03] text-accent [&_svg]:size-4">
            {icon}
          </div>
          {shortcut && (
            <kbd className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[0.65rem] text-subtle-foreground">
              {shortcut}
            </kbd>
          )}
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <h3 className="font-heading text-sm font-medium text-foreground">
              {title}
            </h3>
            <ArrowUpRight className="size-3.5 text-subtle-foreground opacity-0 transition-all duration-200 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </Link>
    </motion.div>
  );
}
