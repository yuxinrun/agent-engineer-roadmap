import type { Metadata } from "next";
import { TechStackPage } from "@/components/tech-stack/tech-stack-page";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "技术栈导航",
  description:
    "AI Agent 开发技术栈导航：大模型、LangChain/LangGraph 等框架、MCP 协议、向量数据库、后端、前端与部署，附带官方文档与学习阶段。",
  alternates: {
    canonical: absoluteUrl("/tech-stack/"),
  },
};

export default function TechStackPageContainer() {
  return <TechStackPage />;
}
