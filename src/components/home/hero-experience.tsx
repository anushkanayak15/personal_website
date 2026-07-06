"use client";

import { motion, type Variants } from "framer-motion";
import { Boxes, FlaskConical, FileText, Mail } from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";
import { CommandCard } from "@/components/ui/command-card";
import { PROFILE } from "@/content/profile";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const headlineContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const headlineLine: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

export function HeroExperience() {
  return (
    <div className="relative">
      {/* headline */}
      <motion.div initial="hidden" animate="show" variants={headlineContainer} className="relative">
        <motion.div variants={headlineLine}>
          <SectionLabel>Anushka Nayak — AI Product Studio</SectionLabel>
        </motion.div>
        <h1 className="mt-5 max-w-3xl text-balance font-heading text-4xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          <motion.span variants={headlineLine} className="block">
            Building AI systems,
          </motion.span>
          <motion.span variants={headlineLine} className="block text-muted-foreground">
            full-stack products,
          </motion.span>
          <motion.span variants={headlineLine} className="block">
            and data-driven software.
          </motion.span>
        </h1>
        <motion.p
          variants={headlineLine}
          className="mt-5 max-w-xl text-balance text-base text-muted-foreground sm:text-lg"
        >
          {PROFILE.tagline}
        </motion.p>
      </motion.div>

      {/* command cards */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45, ease: EASE_OUT }}
        className="mt-12"
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <CommandCard
            href="/products"
            icon={<Boxes strokeWidth={1.75} />}
            title="View Products"
            description="Shipped and in-progress builds"
            shortcut="P"
          />
          <CommandCard
            href="/research"
            icon={<FlaskConical strokeWidth={1.75} />}
            title="Research"
            description="Model cards & experiments"
            shortcut="R"
          />
          <CommandCard
            href={PROFILE.resumeUrl}
            icon={<FileText strokeWidth={1.75} />}
            title="Resume"
            description="Download the one-pager"
            shortcut="⌘R"
          />
          <CommandCard
            href="/contact"
            icon={<Mail strokeWidth={1.75} />}
            title="Contact"
            description="Open a channel"
            shortcut="C"
          />
        </div>
      </motion.div>
    </div>
  );
}
