"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function LogoMark({ size = 32, className }: { size?: number; className?: string }) {
  const reduceMotion = useReducedMotion();
  const orbitSize = size * 1.5;
  const dotSize = Math.max(3, size * 0.09);

  return (
    <span
      className={cn("group relative inline-flex shrink-0 items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      {/* soft glow bloom on hover */}
      <span
        aria-hidden
        className="absolute inset-0 scale-90 rounded-full bg-accent-secondary/0 blur-md transition-all duration-500 group-hover:scale-150 group-hover:bg-accent-secondary/25"
      />

      {/* orbiting accent dot, echoing the mark's own orbit motif */}
      {!reduceMotion && (
        <motion.span
          aria-hidden
          className="absolute left-1/2 top-1/2"
          style={{ width: orbitSize, height: orbitSize, marginLeft: -orbitSize / 2, marginTop: -orbitSize / 2 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        >
          <span
            className="absolute rounded-full bg-accent-secondary shadow-[0_0_6px_1px_rgba(79,142,247,0.8)]"
            style={{
              width: dotSize,
              height: dotSize,
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </motion.span>
      )}

      <Image
        src="/brand/logo-mark.png"
        alt="Anushka Nayak"
        width={160}
        height={160}
        priority
        className="relative h-full w-full object-contain"
      />
    </span>
  );
}
