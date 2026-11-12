"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  GitBranch,
  GraduationCap,
  ListChecks,
  ListOrdered,
  Target,
  Timer,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DynamicIcon } from "@/components/dynamic-icon";
import { getColor } from "@/lib/colors";
import { useProgress } from "@/lib/store/progress-context";
import { computeStageProgress } from "@/lib/progress";
import { KnowledgePointItem } from "@/components/roadmap/knowledge-point";
import { frameworks } from "@/lib/data/frameworks";
import { getStageByOrder } from "@/lib/data/roadmap";
import type { RoadmapStage, StageResourceLink } from "@/lib/types";

const RESOURCE_TYPE_LABEL: Record<string, string> = {
  "official-doc": "官方文档",
  github: "GitHub",
  "video-bilibili": "B站视频",
  "video-youtube": "YouTube",
  article: "文章",
  course: "课程",
};

function ResourceLinks({
  title,
  icon: Icon,
  links,
}: {
  title: string;
  icon: React.ElementType;
  links: StageResourceLink[];
}) {
  if (!links.length) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon className="h-4 w-4 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm transition-colors hover:border-primary/40 hover:bg-accent/50"
          >
            <span className="flex items-center gap-2 min-w-0">
              <span className="text-xs text-muted-foreground shrink-0">
                {RESOURCE_TYPE_LABEL[link.type]}
              </span>
              <span className="truncate group-hover:text-primary transition-colors">
                {link.title}
              </span>
            </span>
            <span className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-muted-foreground">
                {link.lang === "zh" ? "中文" : "英文"}
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
            </span>
          </a>
        ))}
      </CardContent>
    </Card>
  );
}

function InfoCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon className="h-4 w-4 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function StageDetail({ stage }: { stage: RoadmapStage }) {
  const { progress } = useProgress();
  const stat = computeStageProgress(stage, progress);
  const color = getColor(stage.color);
  const isFrameworkStage = stage.slug === "agent-frameworks";

  const prev = stage.order > 1 ? stage.order - 1 : null;
  const next = stage.order < 6 ? stage.order + 1 : null;

  return (
    <div className="container pb-16">
      <div className="py-10 sm:py-14">
        <Link
          href="/roadmap"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          返回学习路线
        </Link>

        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div
              className={cn(
                "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl",
                color.bgSoft,
                color.text
              )}
            >
              <DynamicIcon name={stage.icon} className="h-7 w-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-muted-foreground">
                  阶段 {stage.order}
                </span>
                <Badge
                  variant="secondary"
                  className={cn(color.text)}
                >
                  {stage.weeks}
                </Badge>
              </div>
              <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight">
                {stage.title}
              </h1>
              <p className="mt-1 text-muted-foreground">{stage.subtitle}</p>
            </div>
          </div>

          <div className="w-full sm:w-64 shrink-0 rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">本阶段进度</span>
              <span className="font-semibold">{stat.percent}%</span>
            </div>
            <Progress value={stat.percent} className="mt-2 h-2" />
            <p className="mt-2 text-xs text-muted-foreground">
              已完成 {stat.completed} / {stat.total} 个知识点
              {stat.inProgress > 0 && `，学习中 ${stat.inProgress} 个`}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">阶段概览</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {stage.summary}
              </p>
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="text-sm font-medium mb-1">
                  为什么要学习这个阶段？
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {stage.why}
                </p>
              </div>
              {stage.prerequisites.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">前置知识</p>
                  <div className="flex flex-wrap gap-1.5">
                    {stage.prerequisites.map((p, i) => (
                      <Badge key={i} variant="outline">
                        {p}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <InfoCard title="学习目标" icon={Target}>
            <ul className="space-y-2">
              {stage.goals.map((g, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span className="text-muted-foreground">{g}</span>
                </li>
              ))}
            </ul>
          </InfoCard>

          <InfoCard title="学习内容" icon={BookOpen}>
            <ul className="space-y-2">
              {stage.content.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span
                    className={cn(
                      "mt-1.5 h-1.5 w-1.5 rounded-full shrink-0",
                      color.dot
                    )}
                  />
                  <span className="text-muted-foreground">{c}</span>
                </li>
              ))}
            </ul>
          </InfoCard>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-base">
                <span className="flex items-center gap-2">
                  <ListChecks className="h-4 w-4 text-primary" />
                  知识点（点击标记学习状态）
                </span>
                <span className="text-sm font-normal text-muted-foreground">
                  {stat.completed}/{stat.total}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              {stage.knowledgePoints.map((p) => (
                <KnowledgePointItem key={p.id} point={p} />
              ))}
            </CardContent>
          </Card>

          {isFrameworkStage && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">
                六大框架详解（重点推荐 LangGraph 与 OpenAI Agents SDK）
              </h2>
              {frameworks.map((fw) => {
                const fwColor = getColor(
                  fw.recommended === "required"
                    ? "indigo"
                    : fw.recommended === "recommended"
                      ? "violet"
                      : "slate"
                );
                return (
                  <Card key={fw.slug}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{fw.logo}</span>
                        <div>
                          <CardTitle className="flex items-center gap-2 text-base">
                            {fw.name}
                            <Badge
                              variant={
                                fw.recommended === "required"
                                  ? "default"
                                  : fw.recommended === "recommended"
                                    ? "warning"
                                    : "secondary"
                              }
                            >
                              {fw.recommended === "required"
                                ? "重点学习"
                                : fw.recommended === "recommended"
                                  ? "建议了解"
                                  : "进阶了解"}
                            </Badge>
                          </CardTitle>
                          <p
                            className={cn(
                              "text-xs font-medium",
                              fwColor.text
                            )}
                          >
                            {fw.position}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-1">主要解决的问题</p>
                        <p className="text-sm text-muted-foreground">
                          {fw.problem}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">核心概念</p>
                        <div className="flex flex-wrap gap-1.5">
                          {fw.concepts.map((c) => (
                            <Badge key={c} variant="outline">
                              {c}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-lg bg-muted/50 p-3 font-mono text-xs">
                        {fw.install}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {fw.example}
                      </p>
                      <div>
                        <p className="text-sm font-medium mb-1">与其他框架的区别</p>
                        <p className="text-sm text-muted-foreground">
                          {fw.difference}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <a
                          href={fw.docs}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                        >
                          <BookOpen className="h-4 w-4" />
                          官方文档
                        </a>
                        <a
                          href={fw.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                        >
                          <GitBranch className="h-4 w-4" />
                          GitHub
                        </a>
                        {fw.videos.map((v, i) => (
                          <a
                            key={i}
                            href={v.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                          >
                            <GraduationCap className="h-4 w-4" />
                            {v.lang === "zh" ? "中文视频" : "英文视频"}
                          </a>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <InfoCard title="推荐学习顺序" icon={ListOrdered}>
            <ol className="space-y-2">
              {stage.learningOrder.map((o, i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {i + 1}
                  </span>
                  <span className="text-muted-foreground">{o}</span>
                </li>
              ))}
            </ol>
          </InfoCard>

          <InfoCard title="预计学习时间" icon={Timer}>
            <p className="text-sm text-muted-foreground">{stage.duration}</p>
          </InfoCard>

          <ResourceLinks
            title="官方文档"
            icon={BookOpen}
            links={stage.docs}
          />
          <ResourceLinks
            title="推荐中文视频"
            icon={GraduationCap}
            links={stage.zhVideos}
          />
          <ResourceLinks
            title="推荐英文视频"
            icon={GraduationCap}
            links={stage.enVideos}
          />
          <ResourceLinks
            title="GitHub 开源项目"
            icon={GitBranch}
            links={stage.githubProjects}
          />

          <InfoCard title="实战任务" icon={ListChecks}>
            <ul className="space-y-2">
              {stage.tasks.map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 bg-primary" />
                  <span className="text-muted-foreground">{t}</span>
                </li>
              ))}
            </ul>
          </InfoCard>

          <InfoCard title="阶段验收标准" icon={CheckCircle2}>
            <ul className="space-y-2">
              {stage.acceptance.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span className="text-muted-foreground">{a}</span>
                </li>
              ))}
            </ul>
          </InfoCard>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between">
        {prev ? (
          <Link href={`/roadmap/${getPrevSlug(stage)}`}>
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4" />
              上一阶段
            </Button>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/roadmap/${getNextSlug(stage)}`}>
            <Button>
              下一阶段
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}

function getPrevSlug(stage: RoadmapStage): string {
  return getStageByOrder(stage.order - 1)?.slug ?? stage.slug;
}
function getNextSlug(stage: RoadmapStage): string {
  return getStageByOrder(stage.order + 1)?.slug ?? stage.slug;
}
