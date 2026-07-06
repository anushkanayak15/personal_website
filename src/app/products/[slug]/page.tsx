import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Lock } from "lucide-react";
import { GithubIcon } from "@/components/icons/brand-icons";
import { PageShell } from "@/components/layout/page-shell";
import { SectionLabel } from "@/components/ui/section-label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { SectionBlock } from "@/components/products/section-block";
import { FlowDiagram } from "@/components/diagrams/flow-diagram-lazy";
import { PRODUCTS, getProductBySlug, type ProductStatus } from "@/content/products";
import { formatInlineCode } from "@/lib/format-inline-code";
import { SoftwareJsonLd } from "@/components/seo/software-json-ld";

const STATUS_TONE: Record<ProductStatus, "accent" | "secondary" | "default"> = {
  live: "accent",
  production: "secondary",
  research: "default",
};

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.oneLiner,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <PageShell>
      <SoftwareJsonLd product={product} />
      <Link
        href="/products"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        All products
      </Link>

      <Reveal className="mt-6 flex flex-col gap-4 border-b border-border pb-10">
        <SectionLabel>{product.tagline}</SectionLabel>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-balance font-heading text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            {product.name}
          </h1>
          <Badge variant={STATUS_TONE[product.status]}>{product.statusLabel}</Badge>
        </div>
        <p className="max-w-2xl text-balance text-base text-muted-foreground">{product.oneLiner}</p>

        <div className="flex flex-wrap gap-3 pt-2">
          {product.demo && (
            <Link
              href={product.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
            >
              View demo
              <ArrowUpRight className="size-3.5" />
            </Link>
          )}
          {product.github && (
            <Link
              href={product.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-border-hover hover:bg-white/[0.03]"
            >
              <GithubIcon className="size-3.5" />
              View source
            </Link>
          )}
          {product.githubNote && (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm text-subtle-foreground">
              <Lock className="size-3.5" />
              {product.githubNote}
            </span>
          )}
        </div>
      </Reveal>

      <SectionBlock label="Overview">
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">{product.overview}</p>
      </SectionBlock>

      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Reveal>
          <Card className="h-full p-6">
            <h3 className="font-heading text-sm font-medium text-foreground">Problem</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.problem}</p>
          </Card>
        </Reveal>
        <Reveal delay={0.05}>
          <Card className="h-full p-6">
            <h3 className="font-heading text-sm font-medium text-accent">Solution</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.solution}</p>
          </Card>
        </Reveal>
      </div>

      <SectionBlock label="Architecture">
        <ul className="space-y-3">
          {product.architecture.map((line) => (
            <li key={line} className="flex gap-3 text-sm text-muted-foreground">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-accent/60" />
              <span className="leading-relaxed">{formatInlineCode(line)}</span>
            </li>
          ))}
        </ul>
      </SectionBlock>

      <SectionBlock label="Interactive Diagram">
        <FlowDiagram diagram={product.diagram} />
      </SectionBlock>

      {product.extraSections?.map((section) => (
        <SectionBlock key={section.title} label={section.title}>
          <div className="space-y-3">
            {section.body.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </SectionBlock>
      ))}

      <SectionBlock label="Engineering Decisions">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {product.engineeringDecisions.map((decision) => (
            <Card key={decision.title} className="p-5">
              <h4 className="font-heading text-sm font-medium text-foreground">{decision.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{decision.detail}</p>
            </Card>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock label="Metrics">
        <Card className="grid grid-cols-2 gap-6 p-6 sm:grid-cols-4">
          {product.metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col gap-1.5">
              <span className="font-mono text-[0.7rem] uppercase tracking-wider text-subtle-foreground">
                {metric.label}
              </span>
              <span className="font-heading text-2xl font-medium text-foreground">{metric.value}</span>
            </div>
          ))}
        </Card>
      </SectionBlock>

      <SectionBlock label="Tech Stack">
        <div className="flex flex-wrap gap-2">
          {product.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-border px-3 py-1 font-mono text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock label="Lessons">
        <ul className="space-y-3">
          {product.lessons.map((lesson) => (
            <li key={lesson} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-accent-secondary/60" />
              {lesson}
            </li>
          ))}
        </ul>
      </SectionBlock>

      {product.roadmap && (
        <SectionBlock label="Future Roadmap">
          <ul className="space-y-3">
            {product.roadmap.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-subtle-foreground" />
                {item}
              </li>
            ))}
          </ul>
        </SectionBlock>
      )}

      <div className="mt-16 flex items-center justify-between border-t border-border pt-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          All products
        </Link>
      </div>
    </PageShell>
  );
}
