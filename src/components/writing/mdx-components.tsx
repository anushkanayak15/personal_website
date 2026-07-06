import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2 className="mt-10 mb-4 font-heading text-xl font-medium text-foreground first:mt-0" {...props} />
  ),
  h3: (props) => (
    <h3 className="mt-8 mb-3 font-heading text-lg font-medium text-foreground" {...props} />
  ),
  p: (props) => <p className="mb-5 text-[0.95rem] leading-relaxed text-muted-foreground" {...props} />,
  ul: (props) => <ul className="mb-5 ml-5 list-disc space-y-2 text-muted-foreground" {...props} />,
  ol: (props) => <ol className="mb-5 ml-5 list-decimal space-y-2 text-muted-foreground" {...props} />,
  li: (props) => <li className="text-[0.95rem] leading-relaxed" {...props} />,
  strong: (props) => <strong className="font-medium text-foreground" {...props} />,
  code: (props) => (
    <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.85em] text-foreground" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-5 border-l-2 border-accent/40 pl-4 text-muted-foreground italic"
      {...props}
    />
  ),
  a: (props) => <a className="text-accent underline-offset-4 hover:underline" {...props} />,
};
