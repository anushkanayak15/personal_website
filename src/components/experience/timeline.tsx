"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FlowDiagram } from "@/components/diagrams/flow-diagram-lazy";
import type { ExperienceEntry } from "@/content/experience";
import { getProductBySlug } from "@/content/products";

export function Timeline({ entries }: { entries: ExperienceEntry[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 75%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div ref={containerRef} className="relative">
      <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border sm:left-[19px]" />
      <motion.div
        className="absolute left-[15px] top-2 w-px origin-top bg-accent sm:left-[19px]"
        style={{ scaleY: progress, height: "calc(100% - 1rem)" }}
      />

      <div className="space-y-14">
        {entries.map((entry) => {
          const product = entry.productSlug ? getProductBySlug(entry.productSlug) : undefined;
          return (
            <div key={entry.slug} className="relative pl-10 sm:pl-14">
              <span
                className={`absolute left-0 top-1.5 flex size-8 items-center justify-center rounded-full border sm:size-10 ${
                  entry.featured
                    ? "border-accent/40 bg-accent/10"
                    : "border-border bg-card"
                }`}
              >
                <span
                  className={`size-2 rounded-full ${entry.featured ? "bg-accent" : "bg-subtle-foreground"}`}
                />
              </span>

              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-heading text-lg font-medium text-foreground">{entry.company}</h3>
                <span className="font-mono text-xs text-subtle-foreground">{entry.period}</span>
              </div>
              <p className="mt-1 text-sm font-medium text-muted-foreground">{entry.role}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {entry.summary}
              </p>

              <ul className="mt-4 space-y-2">
                {entry.highlights.map((point) => (
                  <li key={point} className="flex gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-subtle-foreground" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {entry.stack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>

              {entry.featured && product && (
                <div className="mt-6">
                  <FlowDiagram diagram={product.diagram} height="h-56" />
                  <Link
                    href={`/products/${product.slug}`}
                    className="mt-3 inline-flex items-center gap-1 text-xs text-accent hover:underline"
                  >
                    Full case study: {product.name}
                    <ArrowUpRight className="size-3" />
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
