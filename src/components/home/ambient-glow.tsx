"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function AmbientGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18, 0.32], [0.9, 0.5, 0]);

  const storyY = useTransform(scrollYProgress, [0.15, 0.55], [160, -160]);
  const storyOpacity = useTransform(scrollYProgress, [0.18, 0.3, 0.48, 0.6], [0, 0.7, 0.7, 0]);

  const productsY = useTransform(scrollYProgress, [0.5, 1], [220, -80]);
  const productsOpacity = useTransform(scrollYProgress, [0.55, 0.68, 0.9, 1], [0, 0.6, 0.6, 0.25]);

  if (reduceMotion) {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] size-[560px] rounded-full bg-[radial-gradient(circle,rgba(62,207,142,0.14),transparent_70%)] blur-3xl" />
      </div>
    );
  }

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="absolute left-[-10%] top-[-10%] size-[560px] rounded-full bg-[radial-gradient(circle,rgba(62,207,142,0.22),transparent_70%)] blur-3xl"
      />
      <motion.div
        style={{ y: storyY, opacity: storyOpacity }}
        className="absolute right-[-15%] top-[65vh] size-[620px] rounded-full bg-[radial-gradient(circle,rgba(79,142,247,0.20),transparent_70%)] blur-3xl"
      />
      <motion.div
        style={{ y: productsY, opacity: productsOpacity }}
        className="absolute left-[10%] top-[140vh] size-[500px] rounded-full bg-[radial-gradient(circle,rgba(62,207,142,0.16),transparent_70%)] blur-3xl"
      />
    </div>
  );
}
