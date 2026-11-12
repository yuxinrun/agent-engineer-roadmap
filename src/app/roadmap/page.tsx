import type { Metadata } from "next";
import { RoadmapPageClient } from "@/components/roadmap/roadmap-page-client";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "完整学习路线",
  description:
    "AI Agent 学习路线：六大阶段，从编程与大模型基础、LLM 应用开发、Agent 核心原理、主流框架，到 MCP 工程化与企业级项目，帮助程序员系统转型。",
  alternates: {
    canonical: absoluteUrl("/roadmap/"),
  },
};

export default function RoadmapPage() {
  return <RoadmapPageClient />;
}
