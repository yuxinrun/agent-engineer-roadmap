import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DynamicIcon } from "@/components/dynamic-icon";
import { getColor } from "@/lib/colors";
import { DIFFICULTY_META } from "@/lib/constants";
import type { AgentProject } from "@/lib/types";

export function ProjectCard({ project }: { project: AgentProject }) {
  const color = getColor(project.color);
  const diff = DIFFICULTY_META[project.difficulty];

  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col gap-4 p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-primary/30">
        <div className="flex items-start justify-between gap-3">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg",
              color.bgSoft,
              color.text
            )}
          >
            <DynamicIcon name={project.icon} className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-1.5">
            <Badge
              variant={diff.badge}
              className="px-1.5 py-0 text-[10px]"
            >
              {diff.label}
            </Badge>
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Clock className="h-3 w-3" />
              {project.duration}
            </span>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-base font-semibold tracking-tight group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="mt-0.5 text-xs font-medium text-muted-foreground">
            {project.tagline}
          </p>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((s) => (
            <Badge key={s} variant="secondary" className="px-1.5 py-0 text-[10px]">
              {s}
            </Badge>
          ))}
          {project.stack.length > 4 && (
            <Badge variant="outline" className="px-1.5 py-0 text-[10px]">
              +{project.stack.length - 4}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          查看项目详情
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </Card>
    </Link>
  );
}
