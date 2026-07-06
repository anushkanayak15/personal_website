"use client";

import { useState, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { INTERESTS } from "@/content/about";
import { Reveal } from "@/components/motion/reveal";

const SPRING = { stiffness: 300, damping: 22, mass: 0.4 };

function InterestCard({ emoji, label, note }: { emoji: string; label: string; note: string }) {
  const [active, setActive] = useState(false);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, SPRING);
  const springRotateY = useSpring(rotateY, SPRING);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(normalizedX * 12);
    rotateX.set(-normalizedY * 12);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    setActive(false);
  };

  return (
    <motion.div
      style={{ rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 700 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={reset}
      onFocus={() => setActive(true)}
      onBlur={reset}
      tabIndex={0}
      className="group relative flex h-full cursor-default flex-col justify-between gap-6 rounded-xl border border-border bg-card p-5 outline-none transition-colors duration-200 hover:border-accent/40 focus-visible:border-accent/40"
    >
      <div className="flex items-center justify-between">
        <span className="text-3xl">{emoji}</span>
        <span className="font-mono text-[0.65rem] uppercase tracking-wider text-subtle-foreground">
          {label}
        </span>
      </div>
      <div className="min-h-[64px]">
        <AnimatePresence mode="wait">
          {active ? (
            <motion.p
              key="note"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="text-sm leading-relaxed text-foreground"
            >
              {note}
            </motion.p>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-xs text-subtle-foreground"
            >
              Hover for the real story.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function InterestGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {INTERESTS.map((interest, i) => (
        <Reveal key={interest.label} delay={i * 0.06}>
          <InterestCard {...interest} />
        </Reveal>
      ))}
    </div>
  );
}
