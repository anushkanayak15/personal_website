"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Product, ProductStatus } from "@/content/products";

const STATUS_TONE: Record<ProductStatus, "accent" | "secondary" | "default"> = {
  live: "accent",
  production: "secondary",
  research: "default",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 400, damping: 28 }}>
      <Link href={`/products/${product.slug}`} className="block h-full">
        <Card className="group flex h-full flex-col justify-between gap-6 p-5 transition-colors hover:border-border-hover hover:bg-card-hover">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-heading text-base font-medium text-foreground">
                {product.name}
              </h3>
              <p className="mt-0.5 font-mono text-[0.7rem] uppercase tracking-wide text-subtle-foreground">
                {product.tagline}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Badge variant={STATUS_TONE[product.status]}>{product.statusLabel}</Badge>
              <ArrowUpRight className="size-4 text-subtle-foreground opacity-0 transition-all -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
            </div>
          </div>

          <p className="text-sm text-muted-foreground">{product.oneLiner}</p>

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

          <div className="flex items-baseline justify-between border-t border-border pt-4">
            <span className="font-mono text-[0.7rem] uppercase tracking-wider text-subtle-foreground">
              {product.metrics[0]?.label}
            </span>
            <span className="font-mono text-sm text-accent">{product.metrics[0]?.value}</span>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
