"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export type ProductStatus = "live" | "beta" | "building" | "archived";

const STATUS_LABEL: Record<ProductStatus, string> = {
  live: "Live",
  beta: "Beta",
  building: "Building",
  archived: "Archived",
};

const STATUS_TONE: Record<ProductStatus, "accent" | "secondary" | "default"> = {
  live: "accent",
  beta: "secondary",
  building: "secondary",
  archived: "default",
};

export interface Product {
  name: string;
  status: ProductStatus;
  description: string;
  stack: string[];
  metricLabel: string;
  metricValue: string;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 400, damping: 28 }}>
      <Card className="group flex h-full flex-col justify-between gap-6 p-5 transition-colors hover:border-border-hover hover:bg-card-hover">
        <div className="flex items-start justify-between">
          <h3 className="font-heading text-base font-medium text-foreground">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <Badge variant={STATUS_TONE[product.status]}>
              {STATUS_LABEL[product.status]}
            </Badge>
            <ArrowUpRight className="size-4 text-subtle-foreground opacity-0 transition-all -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
          </div>
        </div>

        <p className="text-sm text-muted-foreground">{product.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {product.stack.map((tech) => (
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
            {product.metricLabel}
          </span>
          <span className="font-mono text-sm text-accent">
            {product.metricValue}
          </span>
        </div>
      </Card>
    </motion.div>
  );
}
