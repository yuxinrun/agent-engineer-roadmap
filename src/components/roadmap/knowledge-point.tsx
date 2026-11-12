"use client";

import * as React from "react";
import { Check, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useProgress } from "@/lib/store/progress-context";
import { IMPORTANCE_META, STATUS_META } from "@/lib/constants";
import type { KnowledgePoint as KnowledgePointType } from "@/lib/types";

export function KnowledgePointItem({
  point,
}: {
  point: KnowledgePointType;
}) {
  const { progress, cycleStatus } = useProgress();
  const status = progress[point.id] ?? "not-started";
  const meta = STATUS_META[status];
  const imp = IMPORTANCE_META[point.importance];

  return (
    <div
      className={cn(
        "group flex items-start gap-3 rounded-lg border p-3 transition-colors",
        status === "completed"
          ? "border-emerald-500/30 bg-emerald-500/5"
          : status === "in-progress"
            ? "border-amber-500/30 bg-amber-500/5"
            : "hover:border-border/80 hover:bg-muted/40"
      )}
    >
      <button
        type="button"
        aria-label={`切换「${point.title}」的学习状态`}
        onClick={() => cycleStatus(point.id)}
        className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all",
          status === "completed"
            ? "border-emerald-500 bg-emerald-500 text-white"
            : status === "in-progress"
              ? "border-amber-500 bg-amber-500 text-white"
              : "border-muted-foreground/40 hover:border-primary"
        )}
      >
        {status === "completed" ? (
          <Check className="h-3 w-3" strokeWidth={3} />
        ) : status === "in-progress" ? (
          <Clock className="h-3 w-3" />
        ) : null}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "text-sm font-medium",
              status === "completed" && "text-muted-foreground line-through"
            )}
          >
            {point.title}
          </span>
          <Badge
            variant={imp.badge}
            className="px-1.5 py-0 text-[10px]"
          >
            {imp.label}
          </Badge>
          {point.minutes ? (
            <span className="text-[11px] text-muted-foreground">
              约 {point.minutes >= 60 ? `${Math.round(point.minutes / 60)}h` : `${point.minutes}min`}
            </span>
          ) : null}
        </div>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          {point.description}
        </p>
      </div>

      <span
        className={cn(
          "hidden sm:block shrink-0 text-xs font-medium",
          status === "completed"
            ? "text-emerald-600 dark:text-emerald-400"
            : status === "in-progress"
              ? "text-amber-600 dark:text-amber-400"
              : "text-muted-foreground"
        )}
      >
        {meta.label}
      </span>
    </div>
  );
}
