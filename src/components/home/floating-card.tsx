"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import type { ReactNode } from "react";
import { useMouseParallax } from "@/lib/use-mouse-parallax";
import { cn } from "@/lib/utils";

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  depth?: number;
  delay?: number;
  scrollYProgress?: MotionValue<number>;
  scrollRange?: [number, number];
}

export function FloatingCard({
  children,
  className,
  depth = 1,
  delay = 0,
  scrollYProgress,
  scrollRange = [0, 1],
}: FloatingCardProps) {
  const { x, y: mouseY } = useMouseParallax(10 * depth);
  const scrollDrift = useTransform(
    scrollYProgress ?? mouseY,
    scrollYProgress ? scrollRange : [0, 0],
    scrollYProgress ? [0, -60 * depth] : [0, 0]
  );
  const combinedY = useTransform([mouseY, scrollDrift], ([m, s]) => (m as number) + (s as number));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn("pointer-events-auto", className)}
    >
      <motion.div style={{ x, y: combinedY }}>{children}</motion.div>
    </motion.div>
  );
}
