"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MiniDiagram } from "@/components/home/mini-diagram";
import { FEATURED_PRODUCTS } from "@/content/featured-products";
import { Reveal } from "@/components/motion/reveal";

export function FeaturedProductsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {FEATURED_PRODUCTS.map((product, i) => {
        const href = product.href ?? product.externalHref;
        const isExternal = !product.href && !!product.externalHref;

        return (
          <Reveal key={product.slug} delay={i * 0.06}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 350, damping: 26 }}
              className="group relative h-full"
            >
              <Link
                href={href ?? "#"}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="relative flex h-full flex-col justify-between gap-5 overflow-hidden rounded-xl border border-border bg-card p-5 transition-all duration-300 group-hover:border-accent/40 group-hover:shadow-[0_0_40px_-14px_rgba(62,207,142,0.45)]"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-heading text-base font-medium text-foreground">
                        {product.name}
                      </h3>
                      <p className="mt-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-subtle-foreground">
                        {product.tagline}
                      </p>
                    </div>
                    <Badge variant={product.statusTone} className="shrink-0">
                      {product.statusLabel}
                    </Badge>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {product.outcome}
                  </p>
                </div>

                <div>
                  <MiniDiagram
                    nodeCount={product.nodeCount}
                    edgeCount={product.edgeCount}
                    kind={product.kind}
                    toneClassName={product.kind === "research" ? "text-accent-secondary" : "text-accent"}
                  />

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border px-2 py-0.5 font-mono text-[0.65rem] text-subtle-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-1 border-t border-border pt-4 text-xs text-subtle-foreground transition-colors group-hover:text-accent">
                    {isExternal ? "View on GitHub" : "View case study"}
                    <ArrowUpRight className="size-3 opacity-0 transition-all -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </Reveal>
        );
      })}
    </div>
  );
}
