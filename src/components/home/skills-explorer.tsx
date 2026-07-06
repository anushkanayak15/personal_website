"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SKILL_CATEGORIES, type Skill } from "@/content/skills";
import { resolveProjects } from "@/lib/project-lookup";

export function SkillsExplorer() {
  const [activeCategory, setActiveCategory] = useState(SKILL_CATEGORIES[0].id);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  const category = SKILL_CATEGORIES.find((c) => c.id === activeCategory) ?? SKILL_CATEGORIES[0];
  const relatedProjects = hoveredSkill ? resolveProjects(hoveredSkill.projects) : [];

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setHoveredSkill(null);
            }}
            className={cn(
              "rounded-full border px-3 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors",
              cat.id === activeCategory
                ? "border-accent/40 bg-accent/10 text-accent"
                : "border-border text-muted-foreground hover:border-border-hover hover:text-foreground"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <button
            key={skill.name}
            onMouseEnter={() => setHoveredSkill(skill)}
            onMouseLeave={() => setHoveredSkill((current) => (current?.name === skill.name ? null : current))}
            onFocus={() => setHoveredSkill(skill)}
            onBlur={() => setHoveredSkill((current) => (current?.name === skill.name ? null : current))}
            className={cn(
              "rounded-md border px-3 py-1.5 text-sm transition-colors",
              hoveredSkill?.name === skill.name
                ? "border-accent-secondary/50 bg-accent-secondary/10 text-foreground"
                : "border-border text-muted-foreground hover:border-border-hover hover:text-foreground"
            )}
          >
            {skill.name}
          </button>
        ))}
      </div>

      <div className="mt-5 min-h-[52px] rounded-lg border border-dashed border-border px-4 py-3">
        <AnimatePresence mode="wait">
          {hoveredSkill ? (
            <motion.div
              key={hoveredSkill.name}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="flex flex-wrap items-center gap-2"
            >
              <span className="font-mono text-[0.7rem] uppercase tracking-wider text-subtle-foreground">
                Used in
              </span>
              {relatedProjects.length > 0 ? (
                relatedProjects.map((project) => (
                  <Link
                    key={project.slug}
                    href={project.href}
                    className="inline-flex items-center gap-1 rounded-md border border-accent/30 bg-accent/5 px-2 py-0.5 text-xs text-accent transition-colors hover:bg-accent/10"
                  >
                    {project.name}
                    <ArrowUpRight className="size-2.5" />
                  </Link>
                ))
              ) : (
                <span className="text-xs text-subtle-foreground">Coursework & fundamentals</span>
              )}
            </motion.div>
          ) : (
            <motion.p
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-xs text-subtle-foreground"
            >
              Hover a skill to see which projects used it.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
