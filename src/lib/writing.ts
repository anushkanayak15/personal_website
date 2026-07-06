import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const WRITING_DIR = path.join(process.cwd(), "src/content/writing");

export interface WritingFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

export interface WritingPost extends WritingFrontmatter {
  slug: string;
  readTime: string;
  content: string;
}

export function getAllPosts(): WritingPost[] {
  const files = fs.readdirSync(WRITING_DIR).filter((file) => file.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(WRITING_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const frontmatter = data as WritingFrontmatter;

    return {
      ...frontmatter,
      slug,
      readTime: readingTime(content).text.replace("read", "").trim(),
      content,
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): WritingPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}
