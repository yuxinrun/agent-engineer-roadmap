"use client";

import * as React from "react";
import { Search, SlidersHorizontal, Star, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ResourceCard } from "@/components/resources/resource-card";
import { useFavorites } from "@/lib/store/favorites-context";
import { resources } from "@/lib/data/resources";
import { RESOURCE_CATEGORY_META } from "@/lib/constants";
import type { Resource, ResourceCategoryKey } from "@/lib/types";

type SortKey = "updated" | "hot" | "difficulty-asc";

const CATEGORY_KEYS = Object.keys(RESOURCE_CATEGORY_META) as ResourceCategoryKey[];

const TYPE_OPTIONS = [
  { value: "all", label: "全部类型" },
  { value: "official-doc", label: "官方文档" },
  { value: "video-bilibili", label: "B站视频" },
  { value: "video-youtube", label: "YouTube" },
  { value: "article", label: "技术文章" },
  { value: "github", label: "GitHub 项目" },
  { value: "course-free", label: "免费课程" },
  { value: "course-paid", label: "付费课程" },
];

export function ResourcesPageClient() {
  const { favorites, isFavorite } = useFavorites();
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<ResourceCategoryKey | "all">(
    "all"
  );
  const [type, setType] = React.useState("all");
  const [difficulty, setDifficulty] = React.useState("all");
  const [language, setLanguage] = React.useState("all");
  const [price, setPrice] = React.useState("all");
  const [sort, setSort] = React.useState<SortKey>("updated");
  const [favOnly, setFavOnly] = React.useState(false);

  const filtered = React.useMemo(() => {
    let list: Resource[] = [...resources];

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          (r.tags ?? []).some((t) => t.toLowerCase().includes(q))
      );
    }
    if (category !== "all") list = list.filter((r) => r.category === category);
    if (type !== "all") list = list.filter((r) => r.type === type);
    if (difficulty !== "all")
      list = list.filter((r) => r.difficulty === difficulty);
    if (language !== "all")
      list = list.filter((r) => r.language === language);
    if (price === "free") list = list.filter((r) => r.free);
    if (price === "paid") list = list.filter((r) => !r.free);
    if (favOnly) list = list.filter((r) => isFavorite(r.slug));

    switch (sort) {
      case "hot":
        list = list.sort((a, b) => (b.hot ? 1 : 0) - (a.hot ? 1 : 0));
        break;
      case "difficulty-asc":
        const order = { beginner: 0, intermediate: 1, advanced: 2 };
        list = list.sort(
          (a, b) => order[a.difficulty] - order[b.difficulty]
        );
        break;
      case "updated":
      default:
        list = list.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    }
    return list;
  }, [query, category, type, difficulty, language, price, sort, favOnly, isFavorite]);

  const resetFilters = () => {
    setQuery("");
    setCategory("all");
    setType("all");
    setDifficulty("all");
    setLanguage("all");
    setPrice("all");
    setFavOnly(false);
  };

  const hasActiveFilters =
    query !== "" ||
    category !== "all" ||
    type !== "all" ||
    difficulty !== "all" ||
    language !== "all" ||
    price !== "all" ||
    favOnly;

  return (
    <div className="container pb-16">
      <PageHeader
        eyebrow="教程资源库"
        title="精选学习资源"
        description={`已收录 ${resources.length}+ 条经过整理的优质资源，覆盖官方文档、中文视频、开源项目与课程。支持搜索、筛选、排序与收藏。`}
      />

      {/* 分类导航 */}
      <div className="mb-4 flex gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setCategory("all")}
          className={cn(
            "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
            category === "all"
              ? "bg-primary text-primary-foreground border-primary"
              : "hover:bg-accent"
          )}
        >
          全部
        </button>
        {CATEGORY_KEYS.map((key) => (
          <button
            key={key}
            onClick={() => setCategory(key)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              category === key
                ? "bg-primary text-primary-foreground border-primary"
                : "hover:bg-accent"
            )}
          >
            {RESOURCE_CATEGORY_META[key].short}
          </button>
        ))}
      </div>

      {/* 搜索与筛选 */}
      <div className="mb-6 space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索资源标题、简介或标签…"
              className="pl-9"
            />
          </div>
          <Button
            variant={favOnly ? "default" : "outline"}
            onClick={() => setFavOnly((v) => !v)}
            className="shrink-0"
          >
            <Star className={cn("h-4 w-4", favOnly && "fill-current")} />
            <span className="hidden sm:inline">我的收藏</span>
            <span className="sm:hidden">{favorites.length}</span>
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TYPE_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger className="w-[120px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部难度</SelectItem>
              <SelectItem value="beginner">入门</SelectItem>
              <SelectItem value="intermediate">进阶</SelectItem>
              <SelectItem value="advanced">高级</SelectItem>
            </SelectContent>
          </Select>

          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[120px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部语言</SelectItem>
              <SelectItem value="zh">中文</SelectItem>
              <SelectItem value="en">英文</SelectItem>
              <SelectItem value="zh-en">中英</SelectItem>
            </SelectContent>
          </Select>

          <Select value={price} onValueChange={setPrice}>
            <SelectTrigger className="w-[110px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部价格</SelectItem>
              <SelectItem value="free">免费</SelectItem>
              <SelectItem value="paid">付费</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={sort}
            onValueChange={(v) => setSort(v as SortKey)}
          >
            <SelectTrigger className="w-[130px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="updated">最近更新</SelectItem>
              <SelectItem value="hot">热门优先</SelectItem>
              <SelectItem value="difficulty-asc">难度从低到高</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="h-9"
            >
              <X className="h-4 w-4" />
              清除筛选
            </Button>
          )}
        </div>
      </div>

      <p className="mb-4 text-sm text-muted-foreground">
        共找到 <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
        条资源
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground">
          没有找到符合条件的资源，试试调整筛选条件。
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <ResourceCard key={r.slug} resource={r} />
          ))}
        </div>
      )}

      {/* 最近更新 / 热门 */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border bg-muted/30 p-5">
          <h3 className="font-semibold mb-3">最近更新</h3>
          <ul className="space-y-2">
            {[...resources]
              .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
              .slice(0, 5)
              .map((r) => (
                <li key={r.slug}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="truncate">{r.title}</span>
                    <span className="shrink-0 text-xs">{r.updatedAt}</span>
                  </a>
                </li>
              ))}
          </ul>
        </div>
        <div className="rounded-xl border bg-muted/30 p-5">
          <h3 className="font-semibold mb-3">热门资源</h3>
          <ul className="space-y-2">
            {resources
              .filter((r) => r.hot)
              .slice(0, 5)
              .map((r) => (
                <li key={r.slug}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Badge variant="destructive" className="px-1.5 py-0 text-[10px]">
                      热门
                    </Badge>
                    <span className="truncate">{r.title}</span>
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
