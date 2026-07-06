import { PRODUCTS, type ProductStatus } from "./products";

export interface FeaturedProductPreview {
  slug: string;
  name: string;
  tagline: string;
  statusLabel: string;
  statusTone: "accent" | "secondary" | "default";
  outcome: string;
  tags: string[];
  href?: string;
  externalHref?: string;
  nodeCount: number;
  edgeCount: number;
  kind: "system" | "research";
}

const STATUS_TONE: Record<ProductStatus, "accent" | "secondary" | "default"> = {
  live: "accent",
  production: "secondary",
  research: "default",
};

const OUTCOMES: Record<string, string> = {
  growthos: "Turns weeks of A/B testing into an explainable, minutes-long simulation loop.",
  "amex-dns-platform": "Cut DNS provisioning time 70% for internal teams at American Express.",
  "biomedical-rag": "Isolates retrieval quality from generation quality in biomedical QA.",
  "fairness-aware-asr": "Surfaces gender-based WER gaps across 8 language families.",
};

const TAGS: Record<string, string[]> = {
  growthos: ["Next.js", "TypeScript", "Framer Motion"],
  "amex-dns-platform": ["Python", "Flask", "PostgreSQL"],
  "biomedical-rag": ["RAG", "Llama 3.2", "Retrieval Eval"],
  "fairness-aware-asr": ["Whisper", "LoRA", "Fairness"],
};

const fromProducts: FeaturedProductPreview[] = PRODUCTS.map((product) => ({
  slug: product.slug,
  name: product.name,
  tagline: product.tagline,
  statusLabel: product.statusLabel,
  statusTone: STATUS_TONE[product.status],
  outcome: OUTCOMES[product.slug] ?? product.oneLiner,
  tags: TAGS[product.slug] ?? product.techStack.slice(0, 3),
  href: `/products/${product.slug}`,
  nodeCount: product.diagram.nodes.length,
  edgeCount: product.diagram.edges.length,
  kind: "system",
}));

const solara: FeaturedProductPreview = {
  slug: "solara",
  name: "Solara",
  tagline: "AR grief-support experience — Innovate@UCLA",
  statusLabel: "Hackathon",
  statusTone: "secondary",
  outcome: "Led user research and product design for an AR memory-support experience.",
  tags: ["User Research", "Product Design", "AR Concept"],
  externalHref: "https://github.com/anushkanayak15/Solara",
  nodeCount: 0,
  edgeCount: 0,
  kind: "research",
};

export const FEATURED_PRODUCTS: FeaturedProductPreview[] = [...fromProducts, solara];
