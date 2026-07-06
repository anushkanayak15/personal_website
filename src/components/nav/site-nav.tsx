"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Command } from "lucide-react";
import { NAV_ITEMS } from "@/lib/nav-items";
import { cn } from "@/lib/utils";
import { openCommandPalette } from "@/components/command-palette/command-palette-store";

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-sm font-medium tracking-tight text-foreground"
        >
          <span className="flex size-6 items-center justify-center rounded-md bg-accent/10 text-accent">
            <span className="size-1.5 rounded-full bg-accent" />
          </span>
          Anushka Nayak
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-md bg-white/[0.06]"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span className={cn("relative", isActive && "text-foreground")}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <button
          onClick={openCommandPalette}
          className="flex items-center gap-2 rounded-md border border-border bg-white/[0.02] px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-border-hover hover:text-foreground"
        >
          <Command className="size-3.5" />
          <span className="hidden sm:inline">Command</span>
          <kbd className="hidden rounded border border-border px-1 font-mono text-[0.65rem] sm:inline">
            ⌘K
          </kbd>
        </button>
      </div>
    </header>
  );
}
