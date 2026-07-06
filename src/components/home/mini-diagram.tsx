interface MiniDiagramProps {
  nodeCount: number;
  edgeCount: number;
  kind: "system" | "research";
  toneClassName?: string;
}

export function MiniDiagram({ nodeCount, edgeCount, kind, toneClassName = "text-accent" }: MiniDiagramProps) {
  if (kind === "research") {
    return (
      <svg viewBox="0 0 160 48" fill="none" className={`h-10 w-full ${toneClassName}`}>
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx={80}
            cy={24}
            r={6 + i * 9}
            stroke="currentColor"
            strokeOpacity={0.35 - i * 0.08}
            strokeWidth={1}
          />
        ))}
        <circle cx={80} cy={24} r={3} fill="currentColor" fillOpacity={0.8} />
      </svg>
    );
  }

  const count = Math.min(nodeCount, 6);
  const gap = 160 / (count - 1 || 1);
  const points = Array.from({ length: count }, (_, i) => ({
    x: i * gap,
    y: 24 + (i % 2 === 0 ? -10 : 10),
  }));
  const extraEdges = Math.max(0, Math.min(edgeCount - (count - 1), 2));

  return (
    <svg viewBox="0 0 160 48" fill="none" className={`h-10 w-full ${toneClassName}`}>
      {points.slice(1).map((p, i) => (
        <line
          key={`seq-${i}`}
          x1={points[i].x}
          y1={points[i].y}
          x2={p.x}
          y2={p.y}
          stroke="currentColor"
          strokeOpacity={0.3}
          strokeWidth={1}
        />
      ))}
      {Array.from({ length: extraEdges }).map((_, i) => {
        const a = points[i];
        const b = points[Math.min(points.length - 1, i + 2)];
        return (
          <line
            key={`cross-${i}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="currentColor"
            strokeOpacity={0.15}
            strokeWidth={1}
            strokeDasharray="2 3"
          />
        );
      })}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={i === Math.floor(count / 2) ? 3.5 : 2.5} fill="currentColor" />
      ))}
    </svg>
  );
}
