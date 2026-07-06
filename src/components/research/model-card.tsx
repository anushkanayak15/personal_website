import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";
import { GithubIcon } from "@/components/icons/brand-icons";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { ModelCard as ModelCardData } from "@/content/research";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-[120px_1fr] sm:gap-4">
      <span className="font-mono text-[0.7rem] uppercase tracking-wider text-subtle-foreground">
        {label}
      </span>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

export function ModelCard({ card }: { card: ModelCardData }) {
  return (
    <Card className="p-6 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-heading text-lg font-medium text-foreground">{card.name}</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{card.summary}</p>
          {card.productSlug && (
            <Link
              href={`/products/${card.productSlug}`}
              className="mt-2 inline-flex items-center gap-1 text-xs text-accent hover:underline"
            >
              View as product case study
              <ArrowUpRight className="size-3" />
            </Link>
          )}
        </div>
        {card.github ? (
          <Link
            href={card.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-foreground transition-colors hover:border-border-hover hover:bg-white/[0.03]"
          >
            <GithubIcon className="size-3.5" />
            Repository
            <ArrowUpRight className="size-3" />
          </Link>
        ) : (
          card.githubNote && (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-subtle-foreground">
              <Lock className="size-3" />
              {card.githubNote}
            </span>
          )
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {card.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="mt-6 space-y-4 border-t border-border pt-6">
        <Field label="Dataset">{card.dataset}</Field>
        <Field label="Models">
          <div className="flex flex-wrap gap-1.5">
            {card.models.map((model) => (
              <span
                key={model}
                className="rounded-md border border-border px-2 py-0.5 font-mono text-[0.7rem] text-foreground"
              >
                {model}
              </span>
            ))}
          </div>
        </Field>
        <Field label="Evaluation">{card.evaluation}</Field>
        <Field label="Pipeline">
          <ol className="space-y-1.5">
            {card.pipeline.map((step, i) => (
              <li key={step} className="flex gap-2.5">
                <span className="font-mono text-xs text-subtle-foreground">{String(i + 1).padStart(2, "0")}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </Field>
        <Field label="Results">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {card.results.map((result) => (
              <div key={result.metric} className="rounded-md border border-border bg-white/[0.02] px-3 py-2">
                <div className="font-mono text-[0.65rem] uppercase tracking-wide text-subtle-foreground">
                  {result.metric}
                </div>
                <div className="mt-0.5 font-heading text-sm font-medium text-accent">{result.value}</div>
              </div>
            ))}
          </div>
        </Field>
      </div>
    </Card>
  );
}
