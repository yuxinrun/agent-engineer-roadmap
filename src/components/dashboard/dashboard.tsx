"use client";

import * as React from "react";
import Link from "next/link";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BookMarked,
  CheckCircle2,
  Clock,
  FolderCheck,
  ListChecks,
  Star,
  Target,
  Trash2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useProfile } from "@/lib/store/profile-context";
import { useProgress } from "@/lib/store/progress-context";
import { useFavorites } from "@/lib/store/favorites-context";
import { useProjects } from "@/lib/store/projects-context";
import { computeOverallProgress } from "@/lib/progress";
import { roadmapStages } from "@/lib/data/roadmap";
import { resources } from "@/lib/data/resources";
import { projects } from "@/lib/data/projects";
import { BACKGROUND_META } from "@/lib/constants";
import type { BackgroundKey } from "@/lib/types";

const BACKGROUND_KEYS = Object.keys(BACKGROUND_META) as BackgroundKey[];

export function Dashboard() {
  const { progress, resetAll } = useProgress();
  const { favorites } = useFavorites();
  const { completedProjects } = useProjects();
  const { profile, updateProfile } = useProfile();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const overall = computeOverallProgress(progress);

  const completedPoints = roadmapStages.flatMap((s) =>
    s.knowledgePoints.filter((p) => progress[p.id] === "completed")
  );
  const inProgressPoints = roadmapStages.flatMap((s) =>
    s.knowledgePoints.filter((p) => progress[p.id] === "in-progress")
  );

  const favoriteResources = resources.filter((r) => favorites.includes(r.slug));
  const doneProjects = projects.filter((p) =>
    completedProjects.includes(p.slug)
  );

  const chartData = overall.stages.map((s) => ({
    name: `阶段${s.stage.order}`,
    完成度: s.percent,
  }));

  // 估算完成日期
  const estimate = React.useMemo(() => {
    if (!profile.startDate || !profile.weeklyHours) return null;
    const start = new Date(profile.startDate);
    const remaining = overall.total - overall.completed;
    // 粗略估算：每个知识点平均 4 小时
    const totalHours = remaining * 4;
    const weeks = Math.ceil(totalHours / (profile.weeklyHours || 10));
    const end = new Date(start.getTime() + weeks * 7 * 24 * 3600 * 1000);
    return { weeks, end };
  }, [profile.startDate, profile.weeklyHours, overall.total, overall.completed]);

  return (
    <div className="container pb-16">
      <PageHeader
        eyebrow="我的学习中心"
        title="个人学习仪表盘"
        description="跟踪你的学习进度、管理学习计划。所有数据保存在本地浏览器，未来将支持账号登录与云端同步。"
      />

      {/* 总体进度统计 */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">总体进度</span>
              <Target className="h-4 w-4 text-primary" />
            </div>
            <p className="mt-2 text-2xl font-bold">{overall.percent}%</p>
            <Progress value={overall.percent} className="mt-3 h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">已完成知识点</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="mt-2 text-2xl font-bold">{overall.completed}</p>
            <p className="text-xs text-muted-foreground">
              共 {overall.total} 个知识点
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">收藏教程</span>
              <Star className="h-4 w-4 text-amber-500" />
            </div>
            <p className="mt-2 text-2xl font-bold">{favorites.length}</p>
            <p className="text-xs text-muted-foreground">条资源</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">已完成项目</span>
              <FolderCheck className="h-4 w-4 text-blue-500" />
            </div>
            <p className="mt-2 text-2xl font-bold">{completedProjects.length}</p>
            <p className="text-xs text-muted-foreground">共 {projects.length} 个项目</p>
          </CardContent>
        </Card>
      </div>

      {/* 学习计划管理 */}
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="h-4 w-4 text-primary" />
              学习计划管理
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                技术背景
              </label>
              <Select
                value={profile.background || "none"}
                onValueChange={(v) =>
                  updateProfile({ background: v === "none" ? "" : (v as BackgroundKey) })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择背景" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">未选择</SelectItem>
                  {BACKGROUND_KEYS.map((key) => (
                    <SelectItem key={key} value={key}>
                      {BACKGROUND_META[key].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                每周学习时长（小时）
              </label>
              <Input
                type="number"
                min={1}
                max={40}
                value={profile.weeklyHours}
                onChange={(e) =>
                  updateProfile({ weeklyHours: Number(e.target.value) || 0 })
                }
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                目标周期（周）
              </label>
              <Input
                type="number"
                min={8}
                max={52}
                value={profile.targetWeeks}
                onChange={(e) =>
                  updateProfile({ targetWeeks: Number(e.target.value) || 20 })
                }
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                开始日期
              </label>
              <Input
                type="date"
                value={profile.startDate}
                onChange={(e) => updateProfile({ startDate: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium">
                学习目标
              </label>
              <textarea
                value={profile.goal}
                onChange={(e) => updateProfile({ goal: e.target.value })}
                placeholder="例如：6 个月内转型 AI Agent 工程师，做出 2 个完整项目…"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm min-h-[80px] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            {estimate && (
              <div className="sm:col-span-2 rounded-lg bg-primary/5 border border-primary/20 p-3">
                <p className="text-sm text-muted-foreground">
                  按当前进度，剩余约 {overall.total - overall.completed}{" "}
                  个知识点，预计还需{" "}
                  <span className="font-semibold text-foreground">
                    {estimate.weeks} 周
                  </span>
                  ，预计完成于{" "}
                  <span className="font-semibold text-foreground">
                    {estimate.end.toLocaleDateString("zh-CN")}
                  </span>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ListChecks className="h-4 w-4 text-primary" />
              阶段完成情况
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {overall.stages.map((s) => (
              <Link
                key={s.stage.slug}
                href={`/roadmap/${s.stage.slug}`}
                className="block group"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    阶段 {s.stage.order} · {s.stage.title}
                  </span>
                  <span className="font-medium">{s.percent}%</span>
                </div>
                <Progress value={s.percent} className="mt-1 h-1.5" />
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* 图表 */}
      {mounted && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-base">各阶段完成度对比</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="currentColor" opacity={0.4} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="currentColor" opacity={0.4} />
                <Tooltip
                  formatter={(value) => [`${value}%`, "完成度"]}
                  contentStyle={{
                    background: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    color: "hsl(var(--popover-foreground))",
                  }}
                />
                <Bar dataKey="完成度" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* 已掌握知识点 */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            已掌握知识点（{completedPoints.length}）
          </CardTitle>
        </CardHeader>
        <CardContent>
          {completedPoints.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              还没有完成任何知识点，去学习路线开始你的第一步吧。
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {completedPoints.slice(0, 30).map((p) => (
                <Badge key={p.id} variant="success">
                  {p.title}
                </Badge>
              ))}
              {completedPoints.length > 30 && (
                <Badge variant="outline">
                  +{completedPoints.length - 30}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {inProgressPoints.length > 0 && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="h-4 w-4 text-amber-500" />
              学习中的知识点（{inProgressPoints.length}）
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {inProgressPoints.slice(0, 30).map((p) => (
                <Badge key={p.id} variant="warning">
                  {p.title}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 收藏与项目 */}
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BookMarked className="h-4 w-4 text-primary" />
              收藏的教程（{favoriteResources.length}）
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {favoriteResources.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                还没有收藏教程，去资源库收藏你感兴趣的资源吧。
              </p>
            ) : (
              favoriteResources.map((r) => (
                <Link
                  key={r.slug}
                  href={`/resources/${r.slug}`}
                  className="flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm transition-colors hover:border-primary/40 hover:bg-accent/50"
                >
                  <span className="truncate">{r.title}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {r.updatedAt}
                  </span>
                </Link>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FolderCheck className="h-4 w-4 text-blue-500" />
              已完成项目（{doneProjects.length}）
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {doneProjects.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                还没有完成任何项目，去实战项目库挑一个开始吧。
              </p>
            ) : (
              doneProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm transition-colors hover:border-primary/40 hover:bg-accent/50"
                >
                  <span className="truncate">{p.title}</span>
                  <Badge variant="success">已完成</Badge>
                </Link>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* 数据管理 */}
      <div className="mt-8 flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="text-destructive">
              <Trash2 className="h-4 w-4" />
              重置学习进度
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>确认重置学习进度？</DialogTitle>
              <DialogDescription>
                此操作将清空所有知识点学习状态，且无法恢复。
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">取消</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="destructive" onClick={resetAll}>
                  确认重置
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
