import { SITE_URL } from "@/content/profile";
import type { Product } from "@/content/products";

export function SoftwareJsonLd({ product }: { product: Product }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    description: product.oneLiner,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${SITE_URL}/products/${product.slug}`,
    ...(product.demo ? { downloadUrl: product.demo } : {}),
    ...(product.github ? { codeRepository: product.github } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
