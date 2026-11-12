"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  ExternalLink,
  Star,
  Target,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DynamicIcon } from "@/components/dynamic-icon";
import { ResourceCard } from "@/components/resources/resource-card";
import { useFavorites } from "@/lib/store/favorites-context";
import { resources } from "@/lib/data/resources";
import {
  RESOURCE_TYPE_META,
  RESOURCE_CATEGORY_META,
  DIFFICULTY_META,
  LANG_META,
  VERIFIED_META,
} from "@/lib/constants";
import type { Resource } from "@/lib/types";

export function ResourceDetail({ resource }: { resource: Resource }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(resource.slug);
  const typeMeta = RESOURCE_TYPE_META[resource.type];
  const catMeta = RESOURCE_CATEGORY_META[resource.category];
  const diffMeta = DIFFICULTY_META[resource.difficulty];
  const verified = VERIFIED_META[resource.verified];

  const related = resources
    .filter((r) => r.slug !== resource.slug && r.category === resource.category)
    .slice(0, 3);

  return (
    <div className="container pb-16">
      <div className="py-10">
        <Link
          href="/resources"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          返回资源库
        </Link>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary">
              <DynamicIcon name={typeMeta.icon} className="h-6 w-6" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  {typeMeta.label}
                </span>
                <Badge variant={verified.badge}>
                  {verified.label}
                </Badge>
              </div>
              <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight">
                {resource.title}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={fav ? "default" : "outline"}
              onClick={() => toggleFavorite(resource.slug)}
            >
              <Star className={cn("h-4 w-4", fav && "fill-current")} />
              {fav ? "已收藏" : "收藏"}
            </Button>
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              <Button>
                访问资源
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">资源简介</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {resource.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">推荐理由</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {resource.reason}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="h-4 w-4 text-primary" />
                适合人群
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {resource.audience}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">资源信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">所属分类</span>
                <span className="font-medium">{catMeta.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">难度等级</span>
                <Badge variant={diffMeta.badge}>
                  {diffMeta.label}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">语言</span>
                <span className="font-medium">{LANG_META[resource.language]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">是否免费</span>
                <Badge variant={resource.free ? "success" : "warning"}>
                  {resource.free ? "免费" : "付费"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">更新时间</span>
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="h-3.5 w-3.5" />
                  {resource.updatedAt}
                </span>
              </div>
              {resource.tags && resource.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {resource.tags.map((t) => (
                    <Badge key={t} variant="secondary">
                      {t}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl border bg-gradient-to-br from-brand-blue/10 via-brand-indigo/10 to-brand-violet/10 p-5 text-center transition-colors hover:border-primary/40"
          >
            <p className="text-sm font-semibold">原始链接</p>
            <p className="mt-1 break-all text-xs text-muted-foreground">
              {resource.url}
            </p>
          </a>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-4 text-lg font-semibold">同类推荐</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ResourceCard key={r.slug} resource={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
