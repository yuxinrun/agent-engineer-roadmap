"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, ListChecks, Target, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DynamicIcon } from "@/components/dynamic-icon";
import { getColor } from "@/lib/colors";
import { useProgress } from "@/lib/store/progress-context";
import { computeStageProgress } from "@/lib/progress";
import { KnowledgePointItem } from "@/components/roadmap/knowledge-point";
import { roadmapStages } from "@/lib/data/roadmap";

export function RoadmapTimeline() {
  const { progress } = useProgress();
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({
    [roadmapStages[0].slug]: true,
  });

  const allExpanded = roadmapStages.every((s) => expanded[s.slug]);

  const toggleAll = () => {
    const next = !allExpanded;
    const map: Record<string, boolean> = {};
    roadmapStages.forEach((s) => (map[s.slug] = next));
    setExpanded(map);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          共 {roadmapStages.length} 个阶段 · 点击阶段展开知识点并勾选进度
        </p>
        <Button variant="outline" size="sm" onClick={toggleAll}>
          {allExpanded ? "收起全部" : "展开全部"}
        </Button>
      </div>

      <div className="relative">
        {/* 纵向时间轴线 */}
        <div className="absolute left-[27px] top-4 bottom-4 w-px bg-border hidden sm:block" />

        <div className="space-y-4">
          {roadmapStages.map((stage) => {
            const stat = computeStageProgress(stage, progress);
            const color = getColor(stage.color);
            const isOpen = !!expanded[stage.slug];

            return (
              <div key={stage.slug} className="relative sm:pl-16">
                {/* 时间轴节点 */}
                <div className="hidden sm:flex absolute left-0 top-5 h-[54px] w-[54px] items-center justify-center">
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border-2 bg-background text-sm font-bold z-10",
                      color.border,
                      color.text
                    )}
                  >
                    {stage.order}
                  </span>
                </div>

                <div
                  className={cn(
                    "rounded-xl border bg-card shadow-sm overflow-hidden transition-colors",
                    isOpen && "border-primary/30"
                  )}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpanded((prev) => ({
                        ...prev,
                        [stage.slug]: !prev[stage.slug],
                      }))
                    }
                    className="w-full text-left"
                  >
                    <div className="flex items-start gap-3 p-5">
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg sm:hidden",
                          color.bgSoft,
                          color.text
                        )}
                      >
                        <DynamicIcon name={stage.icon} className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-semibold text-muted-foreground">
                            阶段 {stage.order}
                          </span>
                          <span
                            className={cn(
                              "rounded-full px-2 py-0.5 text-xs font-medium",
                              color.bgSoft,
                              color.text
                            )}
                          >
                            {stage.weeks}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            已完成 {stat.completed}/{stat.total}
                          </span>
                        </div>
                        <h3 className="mt-1 text-lg font-semibold tracking-tight">
                          {stage.title}
                        </h3>
                        <p className="mt-0.5 text-sm text-muted-foreground line-clamp-1">
                          {stage.subtitle}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <span
                          className={cn(
                            "hidden sm:block text-sm font-semibold",
                            color.text
                          )}
                        >
                          {stat.percent}%
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 text-muted-foreground transition-transform",
                            isOpen && "rotate-180"
                          )}
                        />
                      </div>
                    </div>
                    <div className="px-5 pb-4">
                      <Progress value={stat.percent} className="h-1.5" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t px-5 py-5 space-y-5 animate-fade-in">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {stage.summary}
                      </p>

                      <div>
                        <h4 className="flex items-center gap-2 text-sm font-semibold mb-2">
                          <Target className="h-4 w-4 text-primary" />
                          学习目标
                        </h4>
                        <ul className="grid gap-1.5 sm:grid-cols-2">
                          {stage.goals.map((g, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <span
                                className={cn(
                                  "mt-1.5 h-1.5 w-1.5 rounded-full shrink-0",
                                  color.dot
                                )}
                              />
                              {g}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="flex items-center gap-2 text-sm font-semibold mb-2">
                          <ListChecks className="h-4 w-4 text-primary" />
                          知识点（{stat.total}）· 点击圆圈标记进度
                        </h4>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {stage.knowledgePoints.map((point) => (
                            <KnowledgePointItem key={point.id} point={point} />
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Link href={`/roadmap/${stage.slug}`}>
                          <Button variant="outline" size="sm">
                            查看完整详情
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
