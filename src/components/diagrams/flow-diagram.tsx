"use client";

import { useMemo } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { Diagram } from "@/content/products";

const BASE_NODE_STYLE = {
  background: "#111113",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 10,
  color: "#e4e4e7",
  fontFamily: "var(--font-jetbrains-mono)",
  fontSize: 11,
  padding: "8px 14px",
  boxShadow: "0 0 0 1px rgba(255,255,255,0.02)",
};

const TONE_NODE_STYLE = {
  neutral: BASE_NODE_STYLE,
  accent: { ...BASE_NODE_STYLE, border: "1px solid rgba(62,207,142,0.4)", color: "#3ecf8e" },
  secondary: { ...BASE_NODE_STYLE, border: "1px solid rgba(79,142,247,0.4)", color: "#4f8ef7" },
};

const TONE_EDGE_COLOR = {
  neutral: "#3f3f46",
  accent: "#3ecf8e",
  secondary: "#4f8ef7",
};

export function FlowDiagram({ diagram, height = "h-72" }: { diagram: Diagram; height?: string }) {
  const nodes: Node[] = useMemo(
    () =>
      diagram.nodes.map((node) => ({
        id: node.id,
        position: { x: node.x, y: node.y },
        data: { label: node.label },
        style: TONE_NODE_STYLE[node.tone ?? "neutral"],
      })),
    [diagram.nodes]
  );

  const edges: Edge[] = useMemo(
    () =>
      diagram.edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        animated: true,
        style: { stroke: TONE_EDGE_COLOR[edge.tone ?? "neutral"] },
      })),
    [diagram.edges]
  );

  return (
    <div className={`${height} w-full overflow-hidden rounded-lg border border-border bg-background/40`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="rgba(255,255,255,0.06)" />
      </ReactFlow>
    </div>
  );
}
