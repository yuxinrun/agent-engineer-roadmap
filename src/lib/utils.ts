import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 生成页面 title，统一带上站点名 */
export function withSiteTitle(title?: string) {
  const siteName = "Agent 学习地图";
  return title ? `${title} | ${siteName}` : siteName;
}

/** 站点元信息 */
export const siteConfig = {
  name: "Agent 学习地图",
  nameEn: "AI Agent Engineer Roadmap",
  description:
    "一站式 AI Agent 学习路线，整合优质文档、视频教程、开源项目和企业级实战，帮助程序员系统掌握 Agent 开发能力。",
  url: "https://yuxinrun.github.io/agent-engineer-roadmap",
  basePath: "/agent-engineer-roadmap",
  keywords: [
    "AI Agent学习路线",
    "AI Agent开发教程",
    "AI Agent工程师",
    "Agent开发入门",
    "LangGraph教程",
    "LangChain教程",
    "MCP开发教程",
    "程序员转型AI",
    "大模型应用开发",
  ],
  author: "Agent 学习地图团队",
};

/** 拼接站点完整绝对 URL（已含子路径） */
export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path}`;
}
