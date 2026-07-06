"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getProductBySlug, type ProductStatus } from "@/content/products";
import { cn } from "@/lib/utils";

const STATUS_TONE: Record<ProductStatus, "accent" | "secondary" | "default"> = {
  live: "accent",
  production: "secondary",
  research: "default",
};

const BEATS = [
  {
    title: "I build systems.",
    description:
      "Production infrastructure that ships — APIs, data models, and lifecycle automation running inside a Fortune 500 enterprise.",
    slug: "amex-dns-platform",
  },
  {
    title: "I build AI products.",
    description:
      "End-to-end AI systems, from experimentation engines to evaluation-driven product decisions — designed, built, and shipped solo.",
    slug: "growthos",
  },
  {
    title: "I study users.",
    description:
      "Research that measures who a system fails before shipping a fix — like gender-based performance gaps in speech recognition.",
    slug: "fairness-aware-asr",
  },
  {
    title: "I optimize decisions.",
    description:
      "Evaluation frameworks that separate what actually works from what looks like it works — retrieval, generation, and everything between.",
    slug: "biomedical-rag",
  },
];

export function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const index = Math.min(BEATS.length - 1, Math.floor(value * BEATS.length));
    setActiveIndex(index);
  });

  const activeBeat = BEATS[activeIndex];
  const product = getProductBySlug(activeBeat.slug);

  return (
    <div ref={containerRef} style={{ height: `${BEATS.length * 100}vh` }} className="relative">
      <div className="sticky top-20 flex min-h-[80vh] flex-col justify-center py-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* left: sticky crossfading text */}
          <div>
            <div className="mb-6 flex gap-2">
              {BEATS.map((beat, i) => (
                <span
                  key={beat.slug}
                  className={cn(
                    "h-1 w-8 rounded-full transition-colors duration-300",
                    i === activeIndex ? "bg-accent" : "bg-white/10"
                  )}
                />
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="text-balance font-heading text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  {activeBeat.title}
                </h2>
                <p className="mt-5 max-w-md text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {activeBeat.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* right: crossfading product visual */}
          <div className="relative min-h-[420px] sm:h-[340px] sm:min-h-0">
            <AnimatePresence mode="wait">
              {product && (
                <motion.div
                  key={product.slug}
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="glass flex h-full flex-col justify-between rounded-2xl border border-border p-7 shadow-2xl shadow-black/40 sm:absolute sm:inset-0"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[0.7rem] uppercase tracking-wider text-subtle-foreground">
                        {product.tagline}
                      </span>
                      <Badge variant={STATUS_TONE[product.status]}>{product.statusLabel}</Badge>
                    </div>
                    <h3 className="mt-3 font-heading text-2xl font-medium text-foreground">
                      {product.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {product.oneLiner}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5">
                      {product.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border px-2 py-0.5 font-mono text-[0.7rem] text-subtle-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
                      <span className="font-mono text-[0.7rem] uppercase tracking-wider text-subtle-foreground">
                        {product.metrics[0]?.label}
                      </span>
                      <span className="font-mono text-sm text-accent">
                        {product.metrics[0]?.value}
                      </span>
                    </div>
                    <Link
                      href={`/products/${product.slug}`}
                      className="mt-4 inline-flex items-center gap-1 text-sm text-accent hover:underline"
                    >
                      View case study
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
