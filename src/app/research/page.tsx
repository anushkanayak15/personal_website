import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { SectionLabel } from "@/components/ui/section-label";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { ArchitectureDiagram } from "@/components/research/architecture-diagram";
import { ResearchEntry, type ResearchNote } from "@/components/research/research-entry";

const NOTES: ResearchNote[] = [
  {
    title: "Retrieval strategies for long-context agents",
    date: "2026-05",
    abstract:
      "Placeholder — comparing chunking + reranking strategies against long-context stuffing for agent memory.",
    tags: ["RAG", "LLM"],
  },
  {
    title: "Evaluating hallucination rates across model families",
    date: "2026-03",
    abstract:
      "Placeholder — a small eval harness for measuring factuality regressions across releases.",
    tags: ["Evals"],
  },
  {
    title: "Latency budgets for real-time inference",
    date: "2026-01",
    abstract:
      "Placeholder — notes on p99 latency tradeoffs when serving small models at the edge.",
    tags: ["Systems"],
  },
  {
    title: "Feature stores for online personalization",
    date: "2025-11",
    abstract:
      "Placeholder — patterns for keeping online/offline feature parity at low latency.",
    tags: ["Data"],
  },
];

export default function ResearchPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Research"
        title="Experiments & architecture notes"
        description="Working notes from building AI systems — placeholder entries until final write-ups are ready."
      />

      <Reveal className="mt-10">
        <SectionLabel>Featured system — placeholder architecture</SectionLabel>
        <Card className="mt-4 p-4">
          <ArchitectureDiagram />
        </Card>
      </Reveal>

      <div className="mt-14">
        <SectionLabel>Notes</SectionLabel>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          {NOTES.map((note, i) => (
            <Reveal key={note.title} delay={i * 0.05}>
              <ResearchEntry note={note} />
            </Reveal>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
