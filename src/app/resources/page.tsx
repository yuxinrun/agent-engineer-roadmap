import type { Metadata } from "next";
import { ResourcesPageClient } from "@/components/resources/resources-page-client";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "教程资源库",
  description:
    "精选 AI Agent 学习资源：官方文档、B站视频、YouTube 教程、开源项目与免费课程，覆盖大模型基础、RAG、Agent 框架、MCP 等，支持搜索与收藏。",
  alternates: {
    canonical: absoluteUrl("/resources/"),
  },
};

export default function ResourcesPage() {
  return <ResourcesPageClient />;
}
