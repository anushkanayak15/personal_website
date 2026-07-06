import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { ModelCard } from "@/components/research/model-card";
import { MODEL_CARDS } from "@/content/research";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Applied ML research model cards: fairness-aware speech recognition, biosignal decoding, bias auditing, and healthcare classification.",
};

export default function ResearchPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Research"
        title="Model cards"
        description="Four applied ML research projects, documented the way a model card would: dataset, models, evaluation method, pipeline, and results."
      />

      <div className="mt-10 space-y-5">
        {MODEL_CARDS.map((card, i) => (
          <Reveal key={card.slug} delay={i * 0.05}>
            <ModelCard card={card} />
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
