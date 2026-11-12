"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/projects/project-card";
import { useProjects } from "@/lib/store/projects-context";
import { projects } from "@/lib/data/projects";
import type { Difficulty } from "@/lib/types";

const DIFFICULTIES: { value: Difficulty | "all"; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "beginner", label: "入门" },
  { value: "intermediate", label: "进阶" },
  { value: "advanced", label: "高级" },
];

export function ProjectsPageClient() {
  const { completedProjects } = useProjects();
  const [difficulty, setDifficulty] = React.useState<Difficulty | "all">("all");

  const filtered = projects.filter(
    (p) => difficulty === "all" || p.difficulty === difficulty
  );

  return (
    <div className="container pb-16">
      <PageHeader
        eyebrow="实战项目"
        title="Agent 实战项目库"
        description="10 个由浅入深的实战项目，每个项目都附带架构图、实现步骤、推荐教程与验收标准，帮助你从练习走向作品集。"
      />

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">难度筛选：</span>
        {DIFFICULTIES.map((d) => (
          <button
            key={d.value}
            onClick={() => setDifficulty(d.value)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              difficulty === d.value
                ? "bg-primary text-primary-foreground border-primary"
                : "hover:bg-accent"
            )}
          >
            {d.label}
          </button>
        ))}
        <span className="ml-auto text-sm text-muted-foreground">
          已完成 {completedProjects.length} / {projects.length} 个项目
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
