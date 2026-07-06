"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";

export function useMouseParallax(strength = 12): { x: MotionValue<number>; y: MotionValue<number> } {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 60, damping: 16, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 60, damping: 16, mass: 0.6 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion || isCoarsePointer) return;

    function onMouseMove(e: MouseEvent) {
      const normalizedX = e.clientX / window.innerWidth - 0.5;
      const normalizedY = e.clientY / window.innerHeight - 0.5;
      rawX.set(normalizedX * strength);
      rawY.set(normalizedY * strength);
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [rawX, rawY, strength]);

  return { x, y };
}
