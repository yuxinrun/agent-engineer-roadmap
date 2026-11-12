import type {
  BackgroundKey,
  Difficulty,
  Importance,
  PointStatus,
  ResourceCategoryKey,
  ResourceType,
} from "@/lib/types";

export type BadgeVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "success"
  | "warning"
  | "info"
  | "violet";

export const IMPORTANCE_META: Record<
  Importance,
  { label: string; badge: BadgeVariant; dot: string }
> = {
  required: {
    label: "必须掌握",
    badge: "destructive",
    dot: "bg-rose-500",
  },
  recommended: {
    label: "建议掌握",
    badge: "warning",
    dot: "bg-amber-500",
  },
  optional: {
    label: "进阶了解",
    badge: "secondary",
    dot: "bg-slate-400",
  },
};

export const STATUS_META: Record<
  PointStatus,
  { label: string; badge: BadgeVariant }
> = {
  "not-started": { label: "未开始", badge: "secondary" },
  "in-progress": { label: "学习中", badge: "warning" },
  completed: { label: "已完成", badge: "success" },
};

export const DIFFICULTY_META: Record<
  Difficulty,
  { label: string; badge: BadgeVariant }
> = {
  beginner: { label: "入门", badge: "success" },
  intermediate: { label: "进阶", badge: "info" },
  advanced: { label: "高级", badge: "destructive" },
};

export const RESOURCE_TYPE_META: Record<
  ResourceType,
  { label: string; icon: string }
> = {
  "official-doc": { label: "官方文档", icon: "FileText" },
  "video-bilibili": { label: "B站视频", icon: "Play" },
  "video-youtube": { label: "YouTube", icon: "Youtube" },
  article: { label: "技术文章", icon: "Newspaper" },
  github: { label: "GitHub 项目", icon: "Github" },
  "course-free": { label: "免费课程", icon: "GraduationCap" },
  "course-paid": { label: "付费课程", icon: "BookOpen" },
};

export const RESOURCE_CATEGORY_META: Record<
  ResourceCategoryKey,
  { label: string; short: string }
> = {
  "llm-basics": { label: "A · 大模型基础", short: "大模型基础" },
  "llm-app": { label: "B · LLM应用开发", short: "LLM应用开发" },
  "agent-core": { label: "C · Agent开发", short: "Agent开发" },
  "agent-frameworks": { label: "D · Agent框架", short: "Agent框架" },
  mcp: { label: "E · MCP生态", short: "MCP生态" },
  "agent-engineering": { label: "F · Agent工程化", short: "Agent工程化" },
};

export const BACKGROUND_META: Record<
  BackgroundKey,
  {
    label: string;
    icon: string;
    description: string;
    recommendation: string;
  }
> = {
  java: {
    label: "Java 程序员",
    icon: "Coffee",
    description: "有 1~5 年后端开发经验，熟悉 Java 技术栈",
    recommendation:
      "先补 Python 基础，再进入 LLM、RAG、Agent 核心技术；可选 Spring AI 路线。",
  },
  python: {
    label: "Python 程序员",
    icon: "Code2",
    description: "熟悉 Python，可直接进入 LLM 应用开发",
    recommendation:
      "跳过 Python 基础，直接进入大模型应用开发与 Agent 核心技术。",
  },
  go: {
    label: "Go 程序员",
    icon: "Gauge",
    description: "熟悉 Go，擅长后端与高并发服务",
    recommendation:
      "快速补 Python 与 LLM 生态，其余与 Java 路线相近。",
  },
  frontend: {
    label: "前端程序员",
    icon: "Layout",
    description: "熟悉 React/TS，需补充后端、API 与数据库",
    recommendation:
      "优先补 Python、HTTP API、数据库和后端开发能力，再进入 Agent 开发。",
  },
  php: {
    label: "PHP 程序员",
    icon: "Globe",
    description: "熟悉 Web 后端，需迁移到 Python/LLM 生态",
    recommendation:
      "先补 Python 与现代化后端基础，再进入 LLM 与 Agent 开发。",
  },
  beginner: {
    label: "零基础学习者",
    icon: "Sprout",
    description: "编程基础薄弱，需从零开始打牢基础",
    recommendation:
      "先补编程基础与 Python，再进入大模型和 Agent 开发，周期适当拉长。",
  },
};

export const LANG_META: Record<string, string> = {
  zh: "中文",
  en: "英文",
  "zh-en": "中英",
};

export const VERIFIED_META: Record<
  string,
  { label: string; badge: BadgeVariant }
> = {
  verified: { label: "已验证", badge: "success" },
  pending: { label: "待验证", badge: "warning" },
  broken: { label: "已失效", badge: "destructive" },
};
