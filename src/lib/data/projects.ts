import type { AgentProject } from "@/lib/types";

export const projects: AgentProject[] = [
  {
    slug: "ai-chat-assistant",
    title: "AI Chat 聊天助手",
    tagline: "从零实现一个支持多轮对话与流式输出的聊天应用",
    description:
      "最基础的 Agent 前置项目。实现对话历史管理、流式输出、模型切换与简单的上下文管理，是理解 LLM 应用的最小闭环。",
    difficulty: "beginner",
    duration: "3~5 天",
    stack: ["Python", "FastAPI", "React", "OpenAI 兼容 API"],
    stageSlug: "llm-app-development",
    color: "blue",
    icon: "MessageSquare",
    architecture: `flowchart LR
    A[用户输入] --> B[前端界面]
    B -->|HTTP/SSE| C[FastAPI 后端]
    C --> D[对话历史管理]
    D --> E[LLM 模型]
    E -->|流式响应| C
    C --> B`,
    knowledgePoints: [
      "大模型 API 调用",
      "流式输出（SSE）",
      "对话记忆管理",
      "上下文窗口控制",
    ],
    steps: [
      {
        title: "搭建后端",
        description: "用 FastAPI 创建 chat 接口，接入 OpenAI 兼容 API。",
      },
      {
        title: "实现流式输出",
        description: "使用 StreamingResponse 返回 SSE 流式数据。",
      },
      {
        title: "对话历史",
        description: "在服务端维护会话历史，实现多轮上下文。",
      },
      {
        title: "前端界面",
        description: "用 React 构建聊天界面，实现打字机效果。",
      },
    ],
    tutorials: [
      {
        title: "OpenAI Cookbook",
        url: "https://cookbook.openai.com/",
        type: "official-doc",
        lang: "en",
      },
    ],
    githubRef: "https://github.com/Shubhamsaboo/awesome-llm-apps",
    acceptance: [
      "支持多轮对话与流式输出",
      "能切换不同模型",
      "具备基本的上下文管理",
    ],
  },
  {
    slug: "pdf-document-analysis",
    title: "PDF 智能文档分析",
    tagline: "解析 PDF 并用 LLM 做摘要、问答与关键信息抽取",
    description:
      "文档解析与 RAG 的前置项目。实现 PDF 文本提取、切片、摘要生成与问答，理解文档处理链路。",
    difficulty: "beginner",
    duration: "5~7 天",
    stack: ["Python", "PyPDF/PDFPlumber", "LangChain", "LLM"],
    stageSlug: "llm-app-development",
    color: "indigo",
    icon: "FileText",
    architecture: `flowchart TD
    A[上传 PDF] --> B[文档解析]
    B --> C[文本切片]
    C --> D[摘要生成]
    C --> E[问答引擎]
    D --> F[LLM]
    E --> F
    F --> G[结果输出]`,
    knowledgePoints: [
      "文档解析",
      "文档切片",
      "Prompt 设计",
      "结构化输出",
    ],
    steps: [
      {
        title: "文档解析",
        description: "用 PDFPlumber/PyPDF 提取 PDF 文本与表格。",
      },
      {
        title: "文本切片",
        description: "按章节或固定长度切分文本。",
      },
      {
        title: "摘要与问答",
        description: "调用 LLM 实现摘要、问答与信息抽取。",
      },
      {
        title: "封装接口",
        description: "封装为 FastAPI 接口供前端调用。",
      },
    ],
    tutorials: [
      {
        title: "LlamaIndex 文档",
        url: "https://docs.llamaindex.ai/",
        type: "official-doc",
        lang: "en",
      },
    ],
    githubRef: "https://github.com/run-llama/llama_index",
    acceptance: [
      "能解析常见 PDF 并提取文本",
      "能生成文档摘要并回答相关问题",
      "输出结果结构化、可解析",
    ],
  },
  {
    slug: "enterprise-rag-qa",
    title: "企业知识库 RAG 问答系统",
    tagline: "基于向量检索的企业级知识库问答，RAG 的完整落地",
    description:
      "RAG 领域的标杆项目。实现文档入库、向量化、检索、重排与生成的完整链路，是面试与企业落地的高频场景。",
    difficulty: "intermediate",
    duration: "2~3 周",
    stack: ["Python", "FastAPI", "LangChain", "Qdrant/Milvus", "Embedding"],
    stageSlug: "llm-app-development",
    color: "violet",
    icon: "Library",
    architecture: `flowchart TD
    A[知识文档] --> B[解析与切片]
    B --> C[Embedding]
    C --> D[(向量数据库)]
    E[用户提问] --> F[Query 向量化]
    F --> D
    D --> G[向量检索]
    G --> H[Rerank 重排]
    H --> I[LLM 生成]
    I --> J[引用答案]`,
    knowledgePoints: [
      "Embedding",
      "文档切片策略",
      "向量检索与 Rerank",
      "RAG 完整链路",
      "引用与溯源",
    ],
    steps: [
      {
        title: "数据入库",
        description: "实现文档解析、切片与 Embedding 入库。",
      },
      {
        title: "检索链路",
        description: "实现向量检索 + Rerank 的两阶段检索。",
      },
      {
        title: "生成与溯源",
        description: "结合检索结果生成答案，附带引用来源。",
      },
      {
        title: "评估调优",
        description: "建立小规模评估集，调优切片与检索参数。",
      },
    ],
    tutorials: [
      {
        title: "RAG From Scratch",
        url: "https://github.com/langchain-ai/rag-from-scratch",
        type: "github",
        lang: "en",
      },
    ],
    githubRef: "https://github.com/langchain-ai/rag-from-scratch",
    acceptance: [
      "能端到端跑通 RAG 问答",
      "答案附带引用来源",
      "有基本的检索质量评估",
    ],
  },
  {
    slug: "ai-customer-service",
    title: "AI 智能客服",
    tagline: "带工具调用与人工转接的智能客服 Agent",
    description:
      "企业级 Agent 应用。实现意图识别、工具调用（查询订单/工单）、Human-in-the-loop 人工转接与多轮对话，理解生产级 Agent 设计。",
    difficulty: "intermediate",
    duration: "3~4 周",
    stack: ["Python", "FastAPI", "LangGraph", "Redis", "PostgreSQL"],
    stageSlug: "mcp-and-engineering",
    color: "emerald",
    icon: "Headset",
    architecture: `flowchart TD
    A[用户消息] --> B[意图识别]
    B --> C{需要工具?}
    C -->|是| D[Tool Calling]
    D --> E[查询订单/工单]
    E --> F[LLM 生成回复]
    C -->|否| F
    F --> G{需要转人工?}
    G -->|是| H[人工坐席]
    G -->|否| A`,
    knowledgePoints: [
      "Agent Loop",
      "Tool Calling",
      "Human-in-the-loop",
      "对话记忆",
      "状态持久化",
    ],
    steps: [
      {
        title: "工具定义",
        description: "定义订单查询、工单创建等工具。",
      },
      {
        title: "Agent 编排",
        description: "用 LangGraph 编排意图识别与工具调用流程。",
      },
      {
        title: "人工转接",
        description: "实现敏感场景的人工介入节点。",
      },
      {
        title: "持久化",
        description: "用 Redis/PostgreSQL 保存会话与状态。",
      },
    ],
    tutorials: [
      {
        title: "Anthropic: Building Effective Agents",
        url: "https://www.anthropic.com/research/building-effective-agents",
        type: "article",
        lang: "en",
      },
    ],
    githubRef: "https://github.com/langchain-ai/langgraph",
    acceptance: [
      "能调用工具完成订单/工单查询",
      "具备人工转接能力",
      "会话状态可持久化",
    ],
  },
  {
    slug: "ai-data-analyst",
    title: "AI 数据分析 Agent",
    tagline: "自然语言驱动的数据查询与可视化 Agent",
    description:
      "Text-to-SQL 与数据分析 Agent。将自然语言转为 SQL 查询，生成图表与洞察，是数据团队与业务结合的典型场景。",
    difficulty: "intermediate",
    duration: "2~3 周",
    stack: ["Python", "Pandas", "PostgreSQL", "LangGraph", "Chart"],
    stageSlug: "agent-core-principles",
    color: "sky",
    icon: "BarChart3",
    architecture: `flowchart TD
    A[自然语言问题] --> B[Schema 理解]
    B --> C[生成 SQL]
    C --> D[执行查询]
    D --> E{结果正确?}
    E -->|否| C
    E -->|是| F[数据可视化]
    F --> G[洞察总结]`,
    knowledgePoints: [
      "Text-to-SQL",
      "Planning",
      "Reflection 纠错",
      "工具调用",
    ],
    steps: [
      {
        title: "Schema 注入",
        description: "将表结构注入上下文，辅助模型理解。",
      },
      {
        title: "SQL 生成与校验",
        description: "生成 SQL 并执行，失败时反思重试。",
      },
      {
        title: "可视化",
        description: "用图表库渲染查询结果。",
      },
      {
        title: "洞察总结",
        description: "让 Agent 基于数据生成分析洞察。",
      },
    ],
    tutorials: [
      {
        title: "OpenAI Cookbook (Text-to-SQL)",
        url: "https://cookbook.openai.com/examples/sql_agent",
        type: "official-doc",
        lang: "en",
      },
    ],
    githubRef: "https://github.com/vanna-ai/vanna",
    acceptance: [
      "能将自然语言转为可执行 SQL",
      "查询失败时能自动纠错",
      "输出图表与文字洞察",
    ],
  },
  {
    slug: "ai-personal-assistant",
    title: "AI 个人智能助理",
    tagline: "带记忆与工具的个人助理 Agent",
    description:
      "整合日历、待办、搜索等工具的个人助理，重点实践 Memory 记忆机制与工具编排，是理解 Agent 记忆的好项目。",
    difficulty: "intermediate",
    duration: "3~4 周",
    stack: ["Python", "OpenAI Agents SDK", "MCP", "SQLite"],
    stageSlug: "agent-core-principles",
    color: "amber",
    icon: "Sparkles",
    architecture: `flowchart TD
    A[用户指令] --> B[任务理解]
    B --> C[工具选择]
    C --> D[日历/待办/搜索]
    D --> E[Memory 读写]
    E --> F[LLM 决策]
    F --> G{继续?}
    G -->|是| C
    G -->|否| H[结果反馈]`,
    knowledgePoints: [
      "Memory 记忆机制",
      "工具编排",
      "Agent Loop",
      "MCP 工具集成",
    ],
    steps: [
      {
        title: "工具接入",
        description: "接入日历、待办、搜索等工具（可借助 MCP）。",
      },
      {
        title: "记忆系统",
        description: "实现短期与长期记忆的读写。",
      },
      {
        title: "Agent 循环",
        description: "用 OpenAI Agents SDK 实现多步决策循环。",
      },
      {
        title: "个性化",
        description: "基于记忆提供个性化回复。",
      },
    ],
    tutorials: [
      {
        title: "OpenAI Agents SDK",
        url: "https://developers.openai.com/api/docs/guides/agents/sdk",
        type: "official-doc",
        lang: "en",
      },
    ],
    githubRef: "https://github.com/openai/openai-agents-python",
    acceptance: [
      "能调用多种工具完成任务",
      "具备跨会话记忆能力",
      "能进行多步决策",
    ],
  },
  {
    slug: "ai-research-report",
    title: "AI 自动研究报告 Agent",
    tagline: "多步骤自主研究并生成结构化报告",
    description:
      "典型的研究型 Agent。实现信息检索、多源综合、大纲规划与报告生成，是 Planning 与长任务执行的绝佳实践。",
    difficulty: "advanced",
    duration: "3~4 周",
    stack: ["Python", "LangGraph", "Search API", "Markdown"],
    stageSlug: "agent-frameworks",
    color: "rose",
    icon: "FileSearch",
    architecture: `flowchart TD
    A[研究主题] --> B[规划大纲]
    B --> C[子任务拆分]
    C --> D[信息检索]
    D --> E[内容综合]
    E --> F{覆盖完整?}
    F -->|否| D
    F -->|是| G[报告生成]
    G --> H[Markdown 输出]`,
    knowledgePoints: [
      "Planning 任务规划",
      "长任务执行",
      "多步工具调用",
      "结构化输出",
    ],
    steps: [
      {
        title: "大纲规划",
        description: "让 Agent 根据主题生成报告大纲。",
      },
      {
        title: "检索与综合",
        description: "逐节检索信息并综合成文。",
      },
      {
        title: "循环补齐",
        description: "检查覆盖完整性，缺失则继续检索。",
      },
      {
        title: "报告输出",
        description: "生成结构化 Markdown 报告。",
      },
    ],
    tutorials: [
      {
        title: "LangGraph 概览",
        url: "https://docs.langchain.com/oss/python/langgraph/overview",
        type: "official-doc",
        lang: "en",
      },
    ],
    githubRef: "https://github.com/langchain-ai/langgraph",
    acceptance: [
      "能自主完成多步骤研究",
      "报告结构清晰、内容可靠",
      "支持长任务执行",
    ],
  },
  {
    slug: "mcp-tool-assistant",
    title: "MCP 智能工具助手",
    tagline: "基于 MCP 协议的统一工具集成助手",
    description:
      "深入实践 MCP。开发自定义 MCP Server，接入数据库、文件系统等资源，构建可复用工具生态，是 MCP 学习的核心项目。",
    difficulty: "intermediate",
    duration: "2~3 周",
    stack: ["Python", "MCP SDK", "FastAPI", "SQLite"],
    stageSlug: "mcp-and-engineering",
    color: "cyan",
    icon: "PlugZap",
    architecture: `flowchart LR
    A[MCP Client] --> B[MCP Server 1]
    A --> C[MCP Server 2]
    A --> D[MCP Server 3]
    B --> E[数据库]
    C --> F[文件系统]
    D --> G[外部 API]
    A --> H[LLM Agent]`,
    knowledgePoints: [
      "MCP 协议",
      "MCP Server 开发",
      "工具集成",
      "权限管理",
    ],
    steps: [
      {
        title: "自定义 Server",
        description: "开发数据库查询、文件操作等 MCP Server。",
      },
      {
        title: "Client 集成",
        description: "实现 Client 连接与工具发现。",
      },
      {
        title: "接入 Agent",
        description: "将 MCP 工具接入 Agent 框架。",
      },
      {
        title: "权限控制",
        description: "为工具增加权限校验。",
      },
    ],
    tutorials: [
      {
        title: "MCP 官方文档",
        url: "https://modelcontextprotocol.io/",
        type: "official-doc",
        lang: "en",
      },
    ],
    githubRef: "https://github.com/modelcontextprotocol/python-sdk",
    acceptance: [
      "能开发并集成自定义 MCP Server",
      "工具可被发现与调用",
      "具备基础权限校验",
    ],
  },
  {
    slug: "langgraph-multi-agent",
    title: "LangGraph 多 Agent 协作系统",
    tagline: "多个专业 Agent 分工协作完成复杂任务",
    description:
      "多 Agent 协作的高级项目。用 LangGraph 编排研究员、写手、审核员等多个 Agent，实现分工、通信与最终产出。",
    difficulty: "advanced",
    duration: "3~5 周",
    stack: ["Python", "LangGraph", "Multi-Agent", "FastAPI"],
    stageSlug: "agent-frameworks",
    color: "fuchsia",
    icon: "Network",
    architecture: `flowchart TD
    A[任务输入] --> B[编排器]
    B --> C[研究员 Agent]
    B --> D[写手 Agent]
    C --> D
    D --> E[审核员 Agent]
    E -->|需修改| D
    E -->|通过| F[最终产出]`,
    knowledgePoints: [
      "Multi-Agent 协作",
      "图编排",
      "状态管理",
      "角色分工",
    ],
    steps: [
      {
        title: "角色设计",
        description: "定义研究员、写手、审核员的职责与工具。",
      },
      {
        title: "图编排",
        description: "用 LangGraph 定义协作图与流转。",
      },
      {
        title: "状态与通信",
        description: "实现 Agent 间的状态共享与消息传递。",
      },
      {
        title: "审核闭环",
        description: "实现审核-修改的迭代闭环。",
      },
    ],
    tutorials: [
      {
        title: "LangGraph Multi-Agent",
        url: "https://docs.langchain.com/oss/python/langgraph/multi-agent",
        type: "official-doc",
        lang: "en",
      },
    ],
    githubRef: "https://github.com/langchain-ai/langgraph",
    acceptance: [
      "多个 Agent 能协作完成任务",
      "编排图清晰、状态一致",
      "具备审核迭代闭环",
    ],
  },
  {
    slug: "enterprise-automation-workflow",
    title: "企业级 AI 自动化工作流",
    tagline: "端到端的生产级 Agent 平台（含鉴权、可观测、部署）",
    description:
      "毕业级项目。整合鉴权、限流、可观测性、评估与云端部署，交付一个真正可上线的 Agent 平台，是作品集的压轴项目。",
    difficulty: "advanced",
    duration: "4~6 周",
    stack: ["FastAPI", "Next.js", "PostgreSQL", "Redis", "Docker", "Langfuse"],
    stageSlug: "enterprise-and-career",
    color: "slate",
    icon: "Workflow",
    architecture: `flowchart TD
    A[客户端] --> B[API 网关/鉴权]
    B --> C[Agent 编排层]
    C --> D[工具与 MCP]
    C --> E[(PostgreSQL/Redis)]
    C --> F[可观测性]
    G[部署] --> H[Docker + CI/CD]
    H --> B`,
    knowledgePoints: [
      "架构设计",
      "用户认证与权限",
      "并发与成本优化",
      "可观测性与评估",
      "云端部署",
    ],
    steps: [
      {
        title: "架构设计",
        description: "设计分层架构与模块边界。",
      },
      {
        title: "核心功能",
        description: "实现鉴权、Agent 编排与工具层。",
      },
      {
        title: "工程化",
        description: "接入可观测性、评估与限流。",
      },
      {
        title: "部署上线",
        description: "用 Docker + CI/CD 部署到云端。",
      },
    ],
    tutorials: [
      {
        title: "FastAPI 文档",
        url: "https://fastapi.tiangolo.com/",
        type: "official-doc",
        lang: "en",
      },
    ],
    githubRef: "https://github.com/Shubhamsaboo/awesome-llm-apps",
    acceptance: [
      "系统可完整部署上线",
      "具备鉴权、限流与可观测性",
      "有完整的项目文档与演示",
    ],
  },
];

export function getProject(slug: string): AgentProject | undefined {
  return projects.find((p) => p.slug === slug);
}
