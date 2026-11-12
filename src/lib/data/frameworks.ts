export interface FrameworkDetail {
  slug: string;
  name: string;
  logo: string;
  position: string;
  problem: string;
  concepts: string[];
  install: string;
  example: string;
  docs: string;
  github: string;
  videos: { title: string; url: string; lang: "zh" | "en" }[];
  projects: { title: string; url: string }[];
  difference: string;
  recommended: "required" | "recommended" | "optional";
}

export const frameworks: FrameworkDetail[] = [
  {
    slug: "langchain",
    name: "LangChain",
    logo: "🦜",
    position: "LLM 应用组件生态与链式编排框架，是众多上层框架的底层依赖。",
    problem:
      "解决 LLM 应用开发中组件复用与集成繁琐的问题，提供 Prompt、模型、检索、工具、记忆等标准化抽象。",
    concepts: ["Chain", "LCEL", "Runnable", "Agent", "Retriever", "Memory"],
    install: "pip install langchain langchain-openai",
    example: "用 LCEL 组合 Prompt + 模型 + 输出解析器，快速构建链式应用。",
    docs: "https://python.langchain.com/docs/",
    github: "https://github.com/langchain-ai/langchain",
    videos: [
      {
        title: "LangChain 中文教程",
        url: "https://www.bilibili.com/video/BV1hXK46VEAy",
        lang: "zh",
      },
    ],
    projects: [
      {
        title: "LangChain 官方示例",
        url: "https://github.com/langchain-ai/langchain/tree/master/cookbook",
      },
    ],
    difference:
      "定位偏『组件生态』，适合快速组合各类 LLM 能力；但复杂、有状态的工作流更适合用 LangGraph。",
    recommended: "recommended",
  },
  {
    slug: "langgraph",
    name: "LangGraph",
    logo: "🕸️",
    position: "基于图的有状态 Agent 编排框架，LangChain 团队出品（重点推荐）。",
    problem:
      "解决传统链式调用难以表达循环、条件分支、持久化与人工介入等复杂 Agent 工作流的问题。",
    concepts: ["Graph", "Node", "Edge", "State", "Checkpointer", "Subgraph"],
    install: "pip install langgraph",
    example:
      "定义节点与边，构建带循环与 checkpoint 的研究 Agent，支持状态持久化与恢复。",
    docs: "https://docs.langchain.com/oss/python/langgraph/overview",
    github: "https://github.com/langchain-ai/langgraph",
    videos: [
      {
        title: "LangGraph 中文教程",
        url: "https://www.bilibili.com/video/BV1hXK46VEAy",
        lang: "zh",
      },
    ],
    projects: [
      {
        title: "LangGraph 示例仓库",
        url: "https://github.com/langchain-ai/langgraph/tree/main/examples",
      },
    ],
    difference:
      "以『图 + 状态』为核心，擅长复杂、可控、可恢复的工作流，是代码开发方向的首选。",
    recommended: "required",
  },
  {
    slug: "openai-agents-sdk",
    name: "OpenAI Agents SDK",
    logo: "🤖",
    position: "OpenAI 官方轻量级 Agent SDK，追求简洁与生产可用（重点推荐）。",
    problem:
      "解决 Agent 开发中工具调用、会话管理、Guardrails、Tracing 等常见需求碎片化的问题，提供一条极简路径。",
    concepts: ["Agent", "Runner", "Tool", "Guardrail", "Handoff", "Session"],
    install: "pip install openai-agents",
    example:
      "定义一个带工具的 Agent，通过 Runner 运行，并配置 Guardrails 做输入输出校验。",
    docs: "https://developers.openai.com/api/docs/guides/agents/sdk",
    github: "https://github.com/openai/openai-agents-python",
    videos: [
      {
        title: "OpenAI Agents SDK 入门",
        url: "https://www.youtube.com/watch?v=HDNIfOAKV3A",
        lang: "en",
      },
    ],
    projects: [
      {
        title: "OpenAI Agents 示例",
        url: "https://github.com/openai/openai-agents-python/tree/main/examples",
      },
    ],
    difference:
      "更轻、更聚焦 OpenAI 生态，学习曲线平缓，适合快速上生产；跨模型复杂编排可配合 LangGraph。",
    recommended: "required",
  },
  {
    slug: "crewai",
    name: "CrewAI",
    logo: "👥",
    position: "角色化多 Agent 协作框架，适合快速组建『智能体团队』。",
    problem:
      "解决多 Agent 协作时角色定义、任务分配与流程编排繁琐的问题，用 Crew/Task 抽象降低门槛。",
    concepts: ["Agent", "Crew", "Task", "Process", "Tool", "Flow"],
    install: "pip install crewai",
    example:
      "定义研究员、写手两个 Agent，通过 Crew 编排『研究 → 写作』流水线。",
    docs: "https://docs.crewai.com/",
    github: "https://github.com/crewAIInc/crewAI",
    videos: [
      {
        title: "CrewAI 中文教程",
        url: "https://www.bilibili.com/video/BV1VTcuzYE8B/",
        lang: "zh",
      },
    ],
    projects: [
      {
        title: "CrewAI 示例仓库",
        url: "https://github.com/crewAIInc/crewAI-examples",
      },
    ],
    difference:
      "以『角色 + 任务』的 DSL 见长，上手快；但精细控制与复杂状态管理弱于 LangGraph。",
    recommended: "recommended",
  },
  {
    slug: "microsoft-agent-framework",
    name: "Microsoft Agent Framework",
    logo: "🧩",
    position: "微软推出的企业级多智能体编排框架，深度集成 Azure 生态。",
    problem:
      "面向企业场景，解决多智能体编排、身份、监控与企业系统集成等生产级需求。",
    concepts: ["Agent", "Worker", "Orchestrator", "Memory", "Kernel"],
    install: "npm install @microsoft/agent-framework",
    example:
      "用 C# 或 JS 构建 Agent，接入 Azure AI Foundry 与语义内核能力。",
    docs: "https://learn.microsoft.com/azure/ai-foundry/agent-framework/",
    github: "https://github.com/microsoft/agent-framework",
    videos: [
      {
        title: "Microsoft Agent Framework 概览",
        url: "https://www.youtube.com/watch?v=Ac_nXNAaAlQ",
        lang: "en",
      },
    ],
    projects: [
      {
        title: "Agent Framework 示例",
        url: "https://github.com/microsoft/agent-framework/tree/main/samples",
      },
    ],
    difference:
      "面向 Azure/企业级架构，与微软技术栈绑定更深，适合已在微软生态的团队。",
    recommended: "optional",
  },
  {
    slug: "autogen",
    name: "AutoGen",
    logo: "🔁",
    position: "微软研究院出身的多 Agent 对话式编程框架，现已演化为 Microsoft Agent Framework。",
    problem:
      "早期解决多 Agent 通过对话协作完成复杂任务的问题，后被整合进微软统一的 Agent Framework 生态。",
    concepts: ["ConversableAgent", "GroupChat", "UserProxyAgent", "Tool"],
    install: "pip install autogen-agentchat",
    example:
      "定义助手 Agent 与用户代理，通过群聊模式协作完成任务。",
    docs: "https://microsoft.github.io/autogen/",
    github: "https://github.com/microsoft/autogen",
    videos: [
      {
        title: "AutoGen 中文教程",
        url: "https://www.bilibili.com/video/BV1VTcuzYE8B/",
        lang: "zh",
      },
    ],
    projects: [
      {
        title: "AutoGen 示例",
        url: "https://github.com/microsoft/autogen/tree/main/samples",
      },
    ],
    difference:
      "已融入 Microsoft Agent Framework 生态，建议了解其技术背景与演进，不必深入投入。",
    recommended: "optional",
  },
];
