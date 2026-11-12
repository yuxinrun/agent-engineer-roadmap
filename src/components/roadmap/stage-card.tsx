"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DynamicIcon } from "@/components/dynamic-icon";
import { getColor } from "@/lib/colors";
import { useProgress } from "@/lib/store/progress-context";
import { computeStageProgress } from "@/lib/progress";
import type { RoadmapStage } from "@/lib/types";

export function StageCard({ stage }: { stage: RoadmapStage }) {
  const { progress } = useProgress();
  const stat = computeStageProgress(stage, progress);
  const color = getColor(stage.color);

  return (
    <Link href={`/roadmap/${stage.slug}`} className="group block h-full">
      <Card className="relative h-full overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-primary/30">
        <div
          className={cn(
            "absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
            color.gradient
          )}
        />
        <div className="p-5 flex flex-col gap-4 h-full">
          <div className="flex items-start justify-between gap-3">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg",
                color.bgSoft,
                color.text
              )}
            >
              <DynamicIcon name={stage.icon} className="h-5 w-5" />
            </div>
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 text-xs font-medium",
                color.bgSoft,
                color.text
              )}
            >
              {stage.weeks}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground">
                阶段 {stage.order}
              </span>
            </div>
            <h3 className="mt-1 text-base font-semibold tracking-tight group-hover:text-primary transition-colors">
              {stage.title}
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {stage.subtitle}
            </p>
          </div>

          <div className="mt-auto space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                {stage.knowledgePoints.length} 个知识点
              </span>
              <span className="font-medium">{stat.percent}% 完成</span>
            </div>
            <Progress value={stat.percent} className="h-1.5" />
          </div>

          <div className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            查看详情
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
