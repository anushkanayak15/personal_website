import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { ArticleRow, type Article } from "@/components/writing/article-row";

const ARTICLES: Article[] = [
  {
    title: "What building an AI product actually looks like",
    date: "2026-06",
    readTime: "6 min",
    excerpt: "Placeholder excerpt about the gap between demos and shipped products.",
    href: "#",
  },
  {
    title: "Notes on designing calm developer tools",
    date: "2026-04",
    readTime: "4 min",
    excerpt: "Placeholder excerpt about restraint as a design principle.",
    href: "#",
  },
  {
    title: "A pragmatic take on evals",
    date: "2026-02",
    readTime: "8 min",
    excerpt: "Placeholder excerpt about building lightweight eval harnesses early.",
    href: "#",
  },
];

export default function WritingPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Writing"
        title="Essays & notes"
        description="Longer-form thoughts on building AI products and software — placeholder entries until final essays are published."
      />

      <Reveal className="mt-10">
        <Card className="px-6">
          {ARTICLES.map((article) => (
            <ArticleRow key={article.title} article={article} />
          ))}
        </Card>
      </Reveal>
    </PageShell>
  );
}
