import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { ProductCard, type Product } from "@/components/products/product-card";

const PRODUCTS: Product[] = [
  {
    name: "GrowthOS",
    status: "building",
    description:
      "Placeholder — an AI-native growth analytics platform for product teams.",
    stack: ["Next.js", "Postgres", "OpenAI"],
    metricLabel: "Status",
    metricValue: "In development",
  },
  {
    name: "Signal",
    status: "beta",
    description: "Placeholder — real-time anomaly detection for event pipelines.",
    stack: ["Python", "Kafka", "React"],
    metricLabel: "Users",
    metricValue: "1.2k",
  },
  {
    name: "Ledger",
    status: "live",
    description: "Placeholder — automated financial reconciliation tool.",
    stack: ["TypeScript", "tRPC", "Prisma"],
    metricLabel: "Uptime",
    metricValue: "99.98%",
  },
  {
    name: "Cortex",
    status: "live",
    description: "Placeholder — an internal LLM eval and prompt-testing suite.",
    stack: ["Python", "FastAPI", "Redis"],
    metricLabel: "Evals / day",
    metricValue: "4,300",
  },
  {
    name: "Pulse",
    status: "archived",
    description: "Placeholder — early experiment in habit-tracking with ML nudges.",
    stack: ["React Native", "Firebase"],
    metricLabel: "Status",
    metricValue: "Sunset",
  },
  {
    name: "Atlas",
    status: "building",
    description: "Placeholder — a knowledge graph for internal documentation search.",
    stack: ["Next.js", "Neo4j", "OpenAI"],
    metricLabel: "Status",
    metricValue: "In development",
  },
];

export default function ProductsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Products"
        title="Shipped & in-progress builds"
        description="A working log of the products I design, build, and ship end to end — placeholder entries until final case studies are ready."
      />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((product, i) => (
          <Reveal key={product.name} delay={i * 0.05}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
