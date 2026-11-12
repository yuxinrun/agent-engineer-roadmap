import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Compass,
  GitBranch,
  Layers,
  Lightbulb,
  Rocket,
  Shield,
  Target,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StageCard } from "@/components/roadmap/stage-card";
import { ResourceCard } from "@/components/resources/resource-card";
import { ProjectCard } from "@/components/projects/project-card";
import { BackgroundPicker } from "@/components/home/background-picker";
import { roadmapStages } from "@/lib/data/roadmap";
import { resources } from "@/lib/data/resources";
import { projects } from "@/lib/data/projects";

function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-2 text-sm font-medium text-primary">{eyebrow}</p>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-2xl text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

export function RoadmapOverviewSection() {
  return (
    <section className="border-t py-16 sm:py-20">
      <div className="container">
        <SectionHeading
          eyebrow="学习路线概览"
          title="16~24 周，六大核心阶段"
          description="从编程与大模型基础，到 LLM 应用、Agent 原理、主流框架、工程化，最终完成企业级项目与求职准备。学习周期可根据你的基础灵活调整。"
          action={
            <Link href="/roadmap">
              <Button variant="outline">
                查看完整路线
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {roadmapStages.map((stage) => (
            <StageCard key={stage.slug} stage={stage} />
          ))}
        </div>
      </div>
    </section>
  );
}

const ABILITIES = [
  {
    icon: Brain,
    title: "LLM 与 RAG 工程能力",
    desc: "理解大模型原理，能构建检索增强生成系统，解决知识问答问题。",
  },
  {
    icon: Compass,
    title: "Agent 架构与编排能力",
    desc: "掌握 Agent Loop、规划、工具调用与多 Agent 协作的底层机制。",
  },
  {
    icon: Layers,
    title: "框架与工具链能力",
    desc: "熟练使用 LangGraph、OpenAI Agents SDK、MCP 等主流技术栈。",
  },
  {
    icon: Shield,
    title: "工程化与可靠性能力",
    desc: "具备鉴权、可观测性、评估与安全防护等生产级工程素养。",
  },
  {
    icon: GitBranch,
    title: "全栈交付能力",
    desc: "能用 FastAPI + 前端 + 数据库完成端到端的产品交付。",
  },
  {
    icon: Lightbulb,
    title: "问题拆解与判断力",
    desc: "能判断何时用 Agent、何时用工作流，做出正确的技术选型。",
  },
];

export function WhyAgentSection() {
  return (
    <section className="border-t bg-muted/30 py-16 sm:py-20">
      <div className="container">
        <SectionHeading
          eyebrow="为什么现在转型"
          title="为什么程序员应该学习 Agent 开发？"
          description="大模型正从『工具』走向『智能体』，Agent 开发成为新的高薪方向。已有工程经验的程序员，转型优势明显。"
        />
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">三大转型理由</h3>
            <ul className="space-y-4">
              {[
                {
                  t: "需求爆发，人才缺口大",
                  d: "企业纷纷落地 AI Agent 应用，但既懂 LLM 又懂工程的人才严重不足。",
                },
                {
                  t: "复用已有工程能力",
                  d: "RAG、API、数据库、部署等大量技能可直接迁移，转型成本远低于想象。",
                },
                {
                  t: "从执行者到设计者",
                  d: "Agent 工程师需要设计智能体、编排流程，职业天花板与价值更高。",
                },
              ].map((item) => (
                <li key={item.t} className="flex gap-3">
                  <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">{item.t}</p>
                    <p className="text-sm text-muted-foreground">{item.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">
              Agent 工程师需要具备的能力
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {ABILITIES.map((a) => {
                const Icon = a.icon;
                return (
                  <div key={a.title} className="flex gap-3 rounded-lg bg-muted/50 p-3">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium">{a.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                        {a.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturedResourcesSection() {
  const featured = resources.filter((r) => r.featured).slice(0, 6);
  return (
    <section className="border-t py-16 sm:py-20">
      <div className="container">
        <SectionHeading
          eyebrow="精选学习资源"
          title="官方文档 · 中文视频 · 开源项目"
          description="精选高质量、可免费获取的学习资源，覆盖每个学习阶段，帮助你少走弯路。"
          action={
            <Link href="/resources">
              <Button variant="outline">
                进入资源库
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((r) => (
            <ResourceCard key={r.slug} resource={r} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedProjectsSection() {
  const featured = projects.slice(0, 6);
  return (
    <section className="border-t bg-muted/30 py-16 sm:py-20">
      <div className="container">
        <SectionHeading
          eyebrow="实战项目"
          title="从 Demo 到作品集，一步步做出来"
          description="10 个由浅入深的实战项目，附带架构图、实现步骤与验收标准，帮你沉淀可展示的作品集。"
          action={
            <Link href="/projects">
              <Button variant="outline">
                查看全部项目
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

const TRANSITION_ADVICE = [
  {
    bg: "Java 程序员",
    advice:
      "先补 Python 与 LLM 基础，再进入 RAG 与 Agent；可同步了解 Spring AI，作为企业落地备选。",
  },
  {
    bg: "Python 程序员",
    advice:
      "跳过语言基础，直接进入 LLM 应用开发与 Agent 核心原理，重点攻克工程化。",
  },
  {
    bg: "前端程序员",
    advice:
      "重点补 Python、HTTP API、数据库与后端能力，再进入 Agent 开发，发挥 UI 优势。",
  },
  {
    bg: "零基础学习者",
    advice:
      "先打牢编程基础，再进入大模型与 Agent 开发，学习周期可适当拉长到 6 个月以上。",
  },
];

export function LearningAdviceSection() {
  return (
    <section className="border-t py-16 sm:py-20">
      <div className="container">
        <SectionHeading
          eyebrow="个性化学习"
          title="选择你的技术背景，获取定制路线"
          description="不同背景的学习者，起点与重点不同。选择背景，我们为你推荐最优的学习顺序。"
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <BackgroundPicker />

          <div className="rounded-xl border bg-card p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <Target className="h-5 w-5 text-primary" />
              不同背景的转型建议
            </h3>
            <ul className="space-y-4">
              {TRANSITION_ADVICE.map((item) => (
                <li key={item.bg} className="flex gap-3">
                  <Badge variant="secondary" className="shrink-0 mt-0.5">
                    {item.bg}
                  </Badge>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.advice}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-xl border bg-card p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
            <Lightbulb className="h-5 w-5 text-primary" />
            给新手的 3 条学习建议
          </h3>
          <ol className="grid gap-3 sm:grid-cols-3">
            {[
              "先跑通再深究：先做出能运行的项目，再回头理解原理。",
              "不要同时学所有框架：重点掌握 LangGraph 或 OpenAI Agents SDK 之一即可。",
              "坚持输出：每个阶段做一个项目、写一篇笔记，作品集自然成型。",
            ].map((tip, i) => (
              <li
                key={i}
                className="flex gap-3 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground leading-relaxed"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {i + 1}
                </span>
                {tip}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function ContributeSection() {
  return (
    <section className="border-t py-16 sm:py-20">
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-brand-blue/10 via-brand-indigo/10 to-brand-violet/10 p-8 sm:p-12 text-center">
          <div className="mx-auto max-w-2xl">
            <BookOpen className="mx-auto h-10 w-10 text-primary" />
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight">
              一起完善这份学习地图
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              如果你有优质的教程、开源项目或实战经验想分享，欢迎通过 GitHub
              提交贡献，帮助更多程序员顺利转型 AI Agent 工程师。
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button className="w-full sm:w-auto">
                  <GitBranch className="h-4 w-4" />
                  贡献资源
                </Button>
              </a>
              <Link href="/about" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto">
                  了解更多
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
