import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface Article {
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  href: string;
}

export function ArticleRow({ article }: { article: Article }) {
  return (
    <Link
      href={article.href}
      className="group flex flex-col gap-2 border-b border-border py-6 transition-colors first:pt-0 last:border-b-0 hover:bg-white/[0.015] sm:flex-row sm:items-center sm:justify-between sm:gap-6"
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-heading text-base font-medium text-foreground">
            {article.title}
          </h3>
          <ArrowUpRight className="size-3.5 text-subtle-foreground opacity-0 transition-all -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
        </div>
        <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">
          {article.excerpt}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-3 font-mono text-xs text-subtle-foreground">
        <span>{article.date}</span>
        <span className="size-1 rounded-full bg-border" />
        <span>{article.readTime}</span>
      </div>
    </Link>
  );
}
