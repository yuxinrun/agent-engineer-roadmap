/** 知识点重要程度 */
export type Importance = "required" | "recommended" | "optional";

/** 知识点学习状态 */
export type PointStatus = "not-started" | "in-progress" | "completed";

/** 学习背景 */
export type BackgroundKey =
  | "java"
  | "python"
  | "go"
  | "frontend"
  | "php"
  | "beginner";

export interface KnowledgePoint {
  id: string;
  title: string;
  description: string;
  importance: Importance;
  /** 预计学习时长（分钟），用于估算计划 */
  minutes?: number;
}

export interface StageResourceLink {
  title: string;
  url: string;
  type:
    | "official-doc"
    | "github"
    | "video-bilibili"
    | "video-youtube"
    | "article"
    | "course";
  lang: "zh" | "en";
}

export interface RoadmapStage {
  slug: string;
  order: number;
  title: string;
  subtitle: string;
  weeks: string;
  /** 主题色 key，用于视觉区分 */
  color: string;
  /** lucide 图标名 */
  icon: string;
  summary: string;
  /** 学习目标 */
  goals: string[];
  /** 为什么学习 */
  why: string;
  /** 前置知识 */
  prerequisites: string[];
  /** 学习内容概览 */
  content: string[];
  /** 知识点树 */
  knowledgePoints: KnowledgePoint[];
  /** 推荐学习顺序 */
  learningOrder: string[];
  /** 官方文档 */
  docs: StageResourceLink[];
  /** 中文视频 */
  zhVideos: StageResourceLink[];
  /** 英文视频 */
  enVideos: StageResourceLink[];
  /** GitHub 项目 */
  githubProjects: StageResourceLink[];
  /** 实战任务 */
  tasks: string[];
  /** 阶段验收标准 */
  acceptance: string[];
  /** 预计学习时间 */
  duration: string;
}

export type ResourceCategoryKey =
  | "llm-basics"
  | "llm-app"
  | "agent-core"
  | "agent-frameworks"
  | "mcp"
  | "agent-engineering";

export type ResourceType =
  | "official-doc"
  | "video-bilibili"
  | "video-youtube"
  | "article"
  | "github"
  | "course-free"
  | "course-paid";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Resource {
  slug: string;
  title: string;
  description: string;
  url: string;
  category: ResourceCategoryKey;
  stageSlug: string;
  difficulty: Difficulty;
  language: "zh" | "en" | "zh-en";
  free: boolean;
  type: ResourceType;
  /** 推荐理由 */
  reason: string;
  /** 适合人群 */
  audience: string;
  updatedAt: string;
  verified: "verified" | "pending" | "broken";
  tags?: string[];
  hot?: boolean;
  featured?: boolean;
}

export interface ProjectStep {
  title: string;
  description: string;
}

export interface AgentProject {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  difficulty: Difficulty;
  duration: string;
  stack: string[];
  /** Mermaid 架构图源码 */
  architecture: string;
  knowledgePoints: string[];
  steps: ProjectStep[];
  tutorials: StageResourceLink[];
  githubRef: string;
  acceptance: string[];
  stageSlug: string;
  color: string;
  icon: string;
}

export interface TechItem {
  name: string;
  category: string;
  description: string;
  website: string;
  docs: string;
  github?: string;
  tutorials?: { title: string; url: string }[];
  stageSlug: string;
  role: string;
}

export interface TechCategory {
  key: string;
  label: string;
  icon: string;
  description: string;
  items: TechItem[];
}

export interface UserProfile {
  background: BackgroundKey | "";
  weeklyHours: number;
  targetWeeks: number;
  startDate: string;
  goal: string;
}
