"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Clock,
  GitBranch,
  GraduationCap,
  Layers,
  ListChecks,
  Network,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DynamicIcon } from "@/components/dynamic-icon";
import { Mermaid } from "@/components/mermaid";
import { getColor } from "@/lib/colors";
import { useProjects } from "@/lib/store/projects-context";
import { getStage } from "@/lib/data/roadmap";
import { DIFFICULTY_META } from "@/lib/constants";
import type { AgentProject } from "@/lib/types";

export function ProjectDetail({ project }: { project: AgentProject }) {
  const { isCompleted, toggleProject } = useProjects();
  const done = isCompleted(project.slug);
  const color = getColor(project.color);
  const diff = DIFFICULTY_META[project.difficulty];
  const stage = getStage(project.stageSlug);

  return (
    <div className="container pb-16">
      <div className="py-10">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          返回项目库
        </Link>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                color.bgSoft,
                color.text
              )}
            >
              <DynamicIcon name={project.icon} className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {project.title}
              </h1>
              <p className="mt-1 text-muted-foreground">{project.tagline}</p>
            </div>
          </div>
          <Button
            variant={done ? "default" : "outline"}
            onClick={() => toggleProject(project.slug)}
            className="shrink-0"
          >
            <Check className={cn("h-4 w-4", done && "font-bold")} />
            {done ? "已完成项目" : "标记为已完成"}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">项目简介</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                <Badge variant={diff.badge}>{diff.label}</Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {project.duration}
                </Badge>
                {stage && (
                  <Link href={`/roadmap/${stage.slug}`}>
                    <Badge variant="outline" className="hover:border-primary">
                      阶段 {stage.order} · {stage.title}
                    </Badge>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Layers className="h-4 w-4 text-primary" />
                技术栈
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <Badge key={s} variant="secondary">
                    {s}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Network className="h-4 w-4 text-primary" />
                项目架构图
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-lg border bg-muted/30 p-4">
                <Mermaid chart={project.architecture} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <ListChecks className="h-4 w-4 text-primary" />
                实现步骤
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.steps.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                      color.bgSoft,
                      color.text
                    )}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{step.title}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <GraduationCap className="h-4 w-4 text-primary" />
                学习知识点
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {project.knowledgePoints.map((k) => (
                  <li key={k} className="flex items-start gap-2 text-sm">
                    <span
                      className={cn(
                        "mt-1.5 h-1.5 w-1.5 rounded-full shrink-0",
                        color.dot
                      )}
                    />
                    <span className="text-muted-foreground">{k}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">推荐教程</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {project.tutorials.map((t, i) => (
                <a
                  key={i}
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm transition-colors hover:border-primary/40 hover:bg-accent/50"
                >
                  <span className="truncate">{t.title}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {t.lang === "zh" ? "中文" : "英文"}
                  </span>
                </a>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <GitBranch className="h-4 w-4 text-primary" />
                GitHub 参考
              </CardTitle>
            </CardHeader>
            <CardContent>
              <a
                href={project.githubRef}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-sm text-primary hover:underline"
              >
                {project.githubRef}
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                验收标准
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {project.acceptance.map((a, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span className="text-muted-foreground">{a}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
