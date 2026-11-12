import type { Metadata } from "next";
import Link from "next/link";
import {
  Compass,
  Database,
  GitBranch,
  Layers,
  Rocket,
  Shield,
  Users,
} from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "关于本站",
  description:
    "Agent 学习地图的定位与愿景：帮助普通程序员系统掌握 AI Agent 开发能力，完成从程序员到 AI Agent 工程师的转型。",
  alternates: {
    canonical: absoluteUrl("/about/"),
  },
};

const FEATURES = [
  {
    icon: Compass,
    title: "系统化学习路线",
    desc: "六大阶段、18~24 周，从基础到企业级项目，拒绝碎片化学习。",
  },
  {
    icon: Layers,
    title: "精选资源库",
    desc: "45+ 条经过整理的官方文档、中文视频与开源项目，去重去噪。",
  },
  {
    icon: Rocket,
    title: "实战项目",
    desc: "10 个由浅入深的项目，附带架构图与验收标准，沉淀作品集。",
  },
  {
    icon: Shield,
    title: "本地进度管理",
    desc: "知识点勾选、收藏与计划全部本地保存，无需注册即可使用。",
  },
];

const ROADMAP_VALUES = [
  "区分『必须掌握 / 建议掌握 / 进阶了解』，不要求掌握所有框架",
  "帮助建立真正的工程开发能力，而不是只会用某个框架",
  "每个阶段都回答『为什么学、如何学、学完能做什么』",
  "学习周期灵活，可根据个人基础调整",
];

export default function AboutPage() {
  return (
    <div className="container pb-16">
      <PageHeader
        eyebrow="关于本站"
        title="Agent 学习地图"
        description="一个专门面向程序员转型 AI Agent 工程师的学习导航平台，不是技术博客，不是网址收藏夹，而是一条可执行、可追踪的系统学习路线。"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {FEATURES.map((f) => {
          const Icon = f.icon;
          return (
            <Card key={f.title}>
              <CardContent className="flex gap-4 p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-semibold">{f.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-3">
            <Users className="h-5 w-5 text-primary" />
            面向谁？
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>· 有 1~5 年经验的 Java / Python / Go / PHP / 前端开发工程师</li>
            <li>· 希望转型 AI 应用开发的传统程序员</li>
            <li>· 想系统学习 AI Agent 的在校学生</li>
            <li>· 全栈工程师与希望掌握 Agent 开发能力的从业者</li>
          </ul>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-3">
            <Database className="h-5 w-5 text-primary" />
            内容原则
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            {ROADMAP_VALUES.map((v, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                {v}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div id="contribute" className="mt-10 rounded-xl border bg-muted/30 p-6 sm:p-8">
        <h2 className="flex items-center gap-2 text-lg font-semibold mb-3">
          <GitBranch className="h-5 w-5 text-primary" />
          如何贡献？
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
          本站的资源数据采用本地 JSON 维护，数据结构已为接入数据库与管理后台做好准备。
          如果你发现失效链接、有优质教程推荐，或想改进学习路线，欢迎通过 GitHub
          提交 Issue 或 Pull Request。
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Button>
              <GitBranch className="h-4 w-4" />
              GitHub 贡献
            </Button>
          </a>
          <Link href="/roadmap">
            <Button variant="outline">开始学习</Button>
          </Link>
        </div>
      </div>

      <div className="mt-10 rounded-xl border bg-muted/30 p-6">
        <h2 className="text-lg font-semibold mb-3">数据与隐私说明</h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
          当前版本无需注册登录，所有学习进度、收藏与计划均保存在你的浏览器
          LocalStorage 中，不会上传到服务器。未来将支持接入 Supabase
          实现账号系统与跨设备云端同步。外部资源链接均指向原作者/官方站点，版权归原作者所有。
        </p>
      </div>
    </div>
  );
}
