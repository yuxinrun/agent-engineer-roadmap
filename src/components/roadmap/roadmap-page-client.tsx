"use client";

import { CheckCircle2, CircleDashed, Loader2 } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Progress } from "@/components/ui/progress";
import { RoadmapTimeline } from "@/components/roadmap/roadmap-timeline";
import { useProgress } from "@/lib/store/progress-context";
import { computeOverallProgress } from "@/lib/progress";

export function RoadmapPageClient() {
  const { progress } = useProgress();
  const overall = computeOverallProgress(progress);

  return (
    <div className="container">
      <PageHeader
        eyebrow="AI Agent 学习路线"
        title="完整学习路线"
        description="六大阶段，从编程与大模型基础到企业级项目与求职准备。点击每个阶段展开知识点，勾选你的学习进度，进度会自动保存到本地。"
      />

      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">总体进度</span>
            <span className="text-xl font-bold">{overall.percent}%</span>
          </div>
          <Progress value={overall.percent} className="mt-3 h-2" />
        </div>
        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span className="text-sm text-muted-foreground">已完成知识点</span>
          </div>
          <p className="mt-2 text-xl font-bold">{overall.completed}</p>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 text-amber-500" />
            <span className="text-sm text-muted-foreground">学习中</span>
          </div>
          <p className="mt-2 text-xl font-bold">{overall.inProgress}</p>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center gap-2">
            <CircleDashed className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">待学习</span>
          </div>
          <p className="mt-2 text-xl font-bold">{overall.notStarted}</p>
        </div>
      </div>

      <div className="pb-16">
        <RoadmapTimeline />
      </div>
    </div>
  );
}
