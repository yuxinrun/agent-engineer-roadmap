import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles, Rocket } from "lucide-react";

import { Button } from "@/components/ui/button";
import { resources } from "@/lib/data/resources";
import { projects } from "@/lib/data/projects";
import { totalKnowledgePoints } from "@/lib/data/roadmap";

const STATS = [
  { label: "核心学习阶段", value: "6", icon: Sparkles },
  { label: "学习知识点", value: `${totalKnowledgePoints}`, icon: BookOpen },
  { label: "精选教程资源", value: `${resources.length}+`, icon: BookOpen },
  { label: "实战项目", value: `${projects.length}`, icon: Rocket },
];

export function Hero() {
  return (
    <section className="relative">
      {/* 背景装饰：独立裁剪层，避免 overflow-hidden 裁切标题文字 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid mask-fade-b" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[720px] rounded-full bg-gradient-to-r from-brand-blue/20 via-brand-indigo/20 to-brand-violet/20 blur-3xl" />
      </div>

      <div className="container relative z-10 py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground mb-6 animate-fade-in">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            面向程序员转型 · 16~24 周系统学习路线
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight !leading-[1.35] animate-fade-in-up">
            从普通程序员到
            {/* 外层 block 负责换行与间距；内层 inline-block 让渐变贴合文字宽度。
                上下 padding 扩大渐变背景的绘制区域，避免字母 descender（g）和
                中文字形溢出 bg-clip-text 的可裁切范围而变透明。
                !important 行高用于覆盖 text-6xl 自带的 line-height: 1。 */}
            <span className="block mt-1 sm:mt-2">
              <span className="inline-block pt-[0.08em] pb-[0.25em] bg-gradient-to-r from-brand-blue via-brand-indigo to-brand-violet bg-clip-text text-transparent">
                AI Agent 工程师
              </span>
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto animate-fade-in-up">
            一站式 AI Agent
            学习路线，整合优质文档、视频教程、开源项目和企业级实战，帮助程序员系统掌握
            Agent 开发能力。
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto">
                开始学习
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/roadmap" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                查看完整学习路线
              </Button>
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-xl border bg-card/60 p-4 text-center backdrop-blur-sm"
              >
                <Icon className="mx-auto h-5 w-5 text-primary" />
                <div className="mt-2 text-2xl font-bold tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
