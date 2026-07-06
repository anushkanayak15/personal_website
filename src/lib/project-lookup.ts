import { PRODUCTS } from "@/content/products";
import { MODEL_CARDS } from "@/content/research";

export interface ProjectRef {
  slug: string;
  name: string;
  href: string;
}

const PROJECT_LOOKUP: Record<string, ProjectRef> = {};

for (const product of PRODUCTS) {
  PROJECT_LOOKUP[product.slug] = {
    slug: product.slug,
    name: product.name,
    href: `/products/${product.slug}`,
  };
}

for (const card of MODEL_CARDS) {
  if (!PROJECT_LOOKUP[card.slug]) {
    PROJECT_LOOKUP[card.slug] = {
      slug: card.slug,
      name: card.name,
      href: "/research",
    };
  }
}

export function resolveProjects(slugs: string[]): ProjectRef[] {
  return slugs.map((slug) => PROJECT_LOOKUP[slug]).filter(Boolean);
}
