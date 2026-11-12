"use client";

import * as React from "react";
import Link from "next/link";
import { Star, ExternalLink, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DynamicIcon } from "@/components/dynamic-icon";
import { useFavorites } from "@/lib/store/favorites-context";
import {
  RESOURCE_TYPE_META,
  DIFFICULTY_META,
  LANG_META,
  RESOURCE_CATEGORY_META,
  VERIFIED_META,
} from "@/lib/constants";
import type { Resource } from "@/lib/types";

export function ResourceCard({ resource }: { resource: Resource }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(resource.slug);
  const typeMeta = RESOURCE_TYPE_META[resource.type];
  const diffMeta = DIFFICULTY_META[resource.difficulty];
  const catMeta = RESOURCE_CATEGORY_META[resource.category];
  const verified = VERIFIED_META[resource.verified];

  return (
    <Card className="group relative flex flex-col gap-3 p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-primary/30">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-primary">
            <DynamicIcon name={typeMeta.icon} className="h-4 w-4" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">
                {typeMeta.label}
              </span>
              <Badge
                variant={verified.badge}
                className="px-1.5 py-0 text-[10px]"
              >
                {verified.label}
              </Badge>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => toggleFavorite(resource.slug)}
          aria-label={fav ? "取消收藏" : "收藏"}
          className={cn(
            "rounded-md p-1.5 transition-colors",
            fav
              ? "text-amber-500"
              : "text-muted-foreground/40 hover:text-muted-foreground"
          )}
        >
          <Star
            className={cn("h-5 w-5", fav && "fill-amber-500")}
          />
        </button>
      </div>

      <div className="flex-1">
        <h3 className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {resource.title}
        </h3>
        <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {resource.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <Badge variant="outline" className="text-[10px]">
          {catMeta.short}
        </Badge>
        <Badge
          variant={diffMeta.badge}
          className="px-1.5 py-0 text-[10px]"
        >
          {diffMeta.label}
        </Badge>
        <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">
          {LANG_META[resource.language]}
        </Badge>
        <Badge
          variant={resource.free ? "success" : "warning"}
          className="px-1.5 py-0 text-[10px]"
        >
          {resource.free ? "免费" : "付费"}
        </Badge>
      </div>

      <div className="flex items-center justify-between border-t pt-3">
        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <Clock className="h-3 w-3" />
          {resource.updatedAt} 更新
        </span>
        <div className="flex items-center gap-1">
          <Link
            href={`/resources/${resource.slug}`}
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            详情
          </Link>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            访问
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </Card>
  );
}
