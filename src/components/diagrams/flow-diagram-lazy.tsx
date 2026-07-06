import dynamic from "next/dynamic";

export const FlowDiagram = dynamic(
  () => import("./flow-diagram").then((mod) => mod.FlowDiagram),
  {
    loading: () => (
      <div className="h-72 w-full animate-pulse rounded-lg border border-border bg-white/[0.02]" />
    ),
  }
);
