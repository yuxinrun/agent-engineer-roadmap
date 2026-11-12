import type { Metadata } from "next";
import { ProjectsPageClient } from "@/components/projects/projects-page-client";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "实战项目",
  description:
    "AI Agent 实战项目库：10 个由浅入深的项目，覆盖聊天助手、RAG 问答、智能客服、数据分析 Agent、多 Agent 协作与企业级工作流。",
  alternates: {
    canonical: absoluteUrl("/projects/"),
  },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
