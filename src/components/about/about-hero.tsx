"use client";

import { motion, type Variants } from "framer-motion";
import { SectionLabel } from "@/components/ui/section-label";
import { useMouseParallax } from "@/lib/use-mouse-parallax";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const line: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

export function AboutHero() {
  const { x, y } = useMouseParallax(18);

  return (
    <div className="relative">
      <motion.div
        style={{ x, y }}
        aria-hidden
        className="pointer-events-none absolute -right-4 top-0 hidden text-6xl opacity-70 sm:block sm:text-7xl"
      >
        🥐
      </motion.div>

      <motion.div initial="hidden" animate="show" variants={container} className="relative">
        <motion.div variants={line}>
          <SectionLabel>Off the clock</SectionLabel>
        </motion.div>
        <motion.h1
          variants={line}
          className="mt-5 max-w-2xl text-balance font-heading text-4xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          Life, unminified.
        </motion.h1>
        <motion.p
          variants={line}
          className="mt-5 max-w-xl text-balance text-base text-muted-foreground sm:text-lg"
        >
          Software engineer by day. Aspiring French café critic, Formula 1 enthusiast, and
          soon-to-be solo backpacker by... also day, technically, because I have a day job.
        </motion.p>
      </motion.div>
    </div>
  );
}
