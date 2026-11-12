"use client";

import * as React from "react";

export function Mermaid({
  chart,
  className,
}: {
  chart: string;
  className?: string;
}) {
  const [svg, setSvg] = React.useState<string>("");
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "neutral",
          securityLevel: "loose",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, PingFang SC, Microsoft YaHei, sans-serif",
          themeVariables: {
            primaryColor: "#6366f1",
            primaryTextColor: "#0f172a",
            primaryBorderColor: "#818cf8",
            lineColor: "#94a3b8",
            secondaryColor: "#eef2ff",
            tertiaryColor: "#f8fafc",
          },
        });
        const id = `mermaid-${Math.random().toString(36).slice(2, 10)}`;
        const { svg: rendered } = await mermaid.render(id, chart);
        if (!cancelled) {
          setSvg(rendered);
          setError(false);
        }
      } catch {
        if (!cancelled) setError(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (error) {
    return (
      <pre className="overflow-x-auto rounded-lg border bg-muted p-4 text-xs text-muted-foreground">
        {chart}
      </pre>
    );
  }

  return (
    <div
      className={`mermaid-wrap flex items-center justify-center ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
