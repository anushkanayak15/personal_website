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

const NODE_STYLE = {
  background: "#111113",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 10,
  color: "#fff",
  fontFamily: "var(--font-jetbrains-mono)",
  fontSize: 11,
  padding: "8px 14px",
  boxShadow: "0 0 0 1px rgba(255,255,255,0.02)",
};

const ACCENT_NODE_STYLE = {
  ...NODE_STYLE,
  border: "1px solid rgba(62,207,142,0.4)",
  color: "#3ecf8e",
};

const NODES: Node[] = [
  { id: "1", position: { x: 0, y: 60 }, data: { label: "Ingestion" }, style: NODE_STYLE },
  { id: "2", position: { x: 220, y: 0 }, data: { label: "Vector store" }, style: NODE_STYLE },
  { id: "3", position: { x: 220, y: 120 }, data: { label: "Feature store" }, style: NODE_STYLE },
  { id: "4", position: { x: 440, y: 60 }, data: { label: "Orchestrator" }, style: ACCENT_NODE_STYLE },
  { id: "5", position: { x: 660, y: 60 }, data: { label: "Inference API" }, style: NODE_STYLE },
];

const EDGES: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true, style: { stroke: "#27272a" } },
  { id: "e1-3", source: "1", target: "3", animated: true, style: { stroke: "#27272a" } },
  { id: "e2-4", source: "2", target: "4", animated: true, style: { stroke: "#3ecf8e" } },
  { id: "e3-4", source: "3", target: "4", animated: true, style: { stroke: "#3ecf8e" } },
  { id: "e4-5", source: "4", target: "5", animated: true, style: { stroke: "#4f8ef7" } },
];

export function ArchitectureDiagram() {
  const nodes = useMemo(() => NODES, []);
  const edges = useMemo(() => EDGES, []);

  return (
    <div className="h-64 w-full overflow-hidden rounded-lg border border-border bg-background/40">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.3 }}
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
