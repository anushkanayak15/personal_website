import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { getAllPosts } from "@/lib/writing";

export const metadata: Metadata = {
  title: "Writing",
  description: "An engineering journal — notes on building GrowthOS, shipping at American Express, and applied ML research.",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <PageShell>
      <PageHeader
        eyebrow="Writing"
        title="Engineering journal"
        description="Notes on building GrowthOS, shipping production infrastructure at American Express, and applied ML research — written as I ship, not after."
      />

      <Reveal className="mt-10">
        <Card className="px-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/writing/${post.slug}`}
              className="group flex flex-col gap-2 border-b border-border py-6 transition-colors first:pt-6 last:border-b-0 hover:bg-white/[0.015] sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading text-base font-medium text-foreground">
                    {post.title}
                  </h3>
                  <ArrowUpRight className="size-3.5 text-subtle-foreground opacity-0 transition-all -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                </div>
                <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">{post.excerpt}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3 font-mono text-xs text-subtle-foreground">
                <span>{formatDate(post.date)}</span>
                <span className="size-1 rounded-full bg-border" />
                <span>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </Card>
      </Reveal>
    </PageShell>
  );
}
