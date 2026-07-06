"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { TRIP_BEATS } from "@/content/about";
import { cn } from "@/lib/utils";

export function TripStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const index = Math.min(TRIP_BEATS.length - 1, Math.floor(value * TRIP_BEATS.length));
    setActiveIndex(index);
  });

  const activeBeat = TRIP_BEATS[activeIndex];

  return (
    <div ref={containerRef} style={{ height: `${TRIP_BEATS.length * 100}vh` }} className="relative">
      <div className="sticky top-20 flex min-h-[70vh] flex-col justify-center py-10">
        <div className="mb-8 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div className="h-full rounded-full bg-accent" style={{ width: progressWidth }} />
        </div>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="font-mono text-[0.7rem] uppercase tracking-wider text-accent">
              {activeBeat.step} / {TRIP_BEATS.length}
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="mt-3 text-balance font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                  {activeBeat.title}
                </h2>
                <p className="mt-5 max-w-md text-balance text-base leading-relaxed text-muted-foreground">
                  {activeBeat.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative flex h-[280px] items-center justify-center">
            {TRIP_BEATS.map((beat, i) => (
              <motion.div
                key={beat.step}
                animate={{
                  opacity: i === activeIndex ? 1 : 0,
                  scale: i === activeIndex ? 1 : 0.9,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "glass absolute flex size-56 flex-col items-center justify-center gap-3 rounded-full border border-border shadow-2xl shadow-black/40",
                  i === activeIndex ? "pointer-events-auto" : "pointer-events-none"
                )}
              >
                <span className="text-6xl">{beat.emoji}</span>
                <span className="font-mono text-[0.65rem] uppercase tracking-wider text-subtle-foreground">
                  {beat.step}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-2">
          {TRIP_BEATS.map((beat, i) => (
            <span
              key={beat.step}
              className={cn(
                "h-1 w-8 rounded-full transition-colors duration-300",
                i === activeIndex ? "bg-accent" : "bg-white/10"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
