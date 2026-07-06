import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { mdxComponents } from "@/components/writing/mdx-components";
import { getAllPosts, getPostBySlug } from "@/lib/writing";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default async function WritingPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <PageShell className="max-w-3xl">
      <Link
        href="/writing"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        All writing
      </Link>

      <Reveal className="mt-6 border-b border-border pb-8">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="mt-4 text-balance font-heading text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-4 flex items-center gap-3 font-mono text-xs text-subtle-foreground">
          <span>{formatDate(post.date)}</span>
          <span className="size-1 rounded-full bg-border" />
          <span>{post.readTime}</span>
        </div>
      </Reveal>

      <Reveal delay={0.05} className="mt-10">
        <MDXRemote source={post.content} components={mdxComponents} />
      </Reveal>
    </PageShell>
  );
}
