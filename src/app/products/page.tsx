import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/motion/reveal";
import { ProductCard } from "@/components/products/product-card";
import { PRODUCTS } from "@/content/products";
import { OTHER_BUILDS } from "@/content/other-builds";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Production systems, an AI experimentation platform, and applied ML research built end to end by Anushka Nayak.",
};

export default function ProductsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Products"
        title="Shipped & in-progress builds"
        description="Four end-to-end systems — a production experimentation platform, an enterprise infrastructure API, and two applied AI research projects — each broken down from problem to architecture to lessons learned."
      />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PRODUCTS.map((product, i) => (
          <Reveal key={product.slug} delay={i * 0.05}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>

      <div className="mt-16">
        <SectionLabel>More on GitHub</SectionLabel>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {OTHER_BUILDS.map((build, i) => (
            <Reveal key={build.name} delay={i * 0.04}>
              <Link
                href={build.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-4 rounded-lg border border-border bg-card/60 p-4 transition-colors hover:border-border-hover hover:bg-card-hover"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-heading text-sm font-medium text-foreground">
                      {build.name}
                    </h3>
                    <ArrowUpRight className="size-3.5 text-subtle-foreground opacity-0 transition-all -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{build.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {build.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border px-2 py-0.5 font-mono text-[0.65rem] text-subtle-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
