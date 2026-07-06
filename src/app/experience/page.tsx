import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { LogEntry, type WorkLog } from "@/components/experience/log-entry";

const LOGS: WorkLog[] = [
  {
    role: "Software Engineer",
    org: "Placeholder Co.",
    period: "2025 — Present",
    summary: "Placeholder — building full-stack features for a data platform.",
    highlights: [
      "Placeholder highlight about a shipped feature.",
      "Placeholder highlight about a performance improvement.",
    ],
    stack: ["TypeScript", "React", "Postgres"],
  },
  {
    role: "AI Research Intern",
    org: "Placeholder Lab",
    period: "2024",
    summary: "Placeholder — worked on evaluation tooling for LLM applications.",
    highlights: [
      "Placeholder highlight about an eval pipeline.",
      "Placeholder highlight about a research finding.",
    ],
    stack: ["Python", "PyTorch"],
  },
  {
    role: "Software Engineering Intern",
    org: "Placeholder Startup",
    period: "2023",
    summary: "Placeholder — contributed to core product surfaces.",
    highlights: [
      "Placeholder highlight about a feature launch.",
      "Placeholder highlight about cross-team collaboration.",
    ],
    stack: ["Next.js", "Node.js"],
  },
];

export default function ExperiencePage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Experience"
        title="Work log"
        description="A running log of roles and projects — placeholder entries until final content is ready."
      />

      <Reveal className="mt-10">
        <Card className="p-6 sm:p-8">
          {LOGS.map((log, i) => (
            <LogEntry key={log.role + log.org} log={log} index={i} />
          ))}
        </Card>
      </Reveal>
    </PageShell>
  );
}
