"use client";

import * as React from "react";
import Link from "next/link";
import { ExternalLink, GitBranch, Globe, Search, FileText } from "lucide-react";

import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DynamicIcon } from "@/components/dynamic-icon";
import { techCategories } from "@/lib/data/tech-stack";
import { getStage } from "@/lib/data/roadmap";

export function TechStackPage() {
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState<string>("all");

  const filtered = techCategories
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((item) => {
        const matchQuery =
          !query.trim() ||
          item.name.toLowerCase().includes(query.trim().toLowerCase()) ||
          item.description.toLowerCase().includes(query.trim().toLowerCase());
        const matchCat = active === "all" || cat.key === active;
        return matchQuery && matchCat;
      }),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <div className="container pb-16">
      <PageHeader
        eyebrow="技术栈导航"
        title="Agent 开发技术栈"
        description="按技术分类梳理 Agent 开发所需的核心技术：大模型、开发框架、Agent 协议、向量数据库、后端、前端与部署，每项技术都附带官方资源与学习阶段。"
      />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索技术名称或简介…"
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setActive("all")}
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              active === "all"
                ? "bg-primary text-primary-foreground border-primary"
                : "hover:bg-accent"
            )}
          >
            全部
          </button>
          {techCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                active === cat.key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "hover:bg-accent"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-10">
        {filtered.map((cat) => {
          return (
            <section key={cat.key}>
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-primary">
                  <DynamicIcon name={cat.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-lg font-semibold">{cat.label}</h2>
                  <p className="text-sm text-muted-foreground">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cat.items.map((item) => {
                  const stage = getStage(item.stageSlug);
                  return (
                    <Card
                      key={item.name}
                      className="flex flex-col gap-3 p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-primary/30"
                    >
                      <div>
                        <h3 className="text-base font-semibold">{item.name}</h3>
                        <p className="text-xs font-medium text-primary mt-0.5">
                          {item.role}
                        </p>
                      </div>
                      <p className="flex-1 text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                      {stage && (
                        <Link href={`/roadmap/${stage.slug}`}>
                          <Badge variant="outline" className="hover:border-primary">
                            阶段 {stage.order} · {stage.title}
                          </Badge>
                        </Link>
                      )}
                      <div className="flex flex-wrap gap-x-3 gap-y-1 border-t pt-3 text-xs">
                        <a
                          href={item.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                        >
                          <Globe className="h-3.5 w-3.5" />
                          官网
                        </a>
                        <a
                          href={item.docs}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          文档
                        </a>
                        {item.github && (
                          <a
                            href={item.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                          >
                            <GitBranch className="h-3.5 w-3.5" />
                            GitHub
                          </a>
                        )}
                        {item.tutorials?.map((t, i) => (
                          <a
                            key={i}
                            href={t.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            {t.title}
                          </a>
                        ))}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>
          );
        })}

        {filtered.length === 0 && (
          <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground">
            没有找到匹配的技术，换个关键词试试。
          </div>
        )}
      </div>
    </div>
  );
}
