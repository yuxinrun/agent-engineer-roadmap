# Agent 学习地图 · AI Agent Engineer Roadmap

一个面向程序员转型 **AI Agent 工程师** 的一站式中文学习导航平台。

> 从普通程序员到 AI Agent 工程师，16~24 周系统学习路线。

## 功能特性

- **系统学习路线**：六大核心阶段（编程与大模型基础 → LLM 应用 → Agent 原理 → 主流框架 → MCP 工程化 → 企业级项目与求职），纵向时间轴 + 可展开知识点树。
- **进度管理**：知识点可标记「未开始 / 学习中 / 已完成」，自动计算阶段与整体完成度，进度保存在浏览器 LocalStorage。
- **教程资源库**：45+ 条真实学习资源（官方文档、B站视频、GitHub、课程），支持搜索、多条件筛选、排序与收藏。
- **实战项目库**：10 个由浅入深的项目，附带 Mermaid 架构图、实现步骤与验收标准。
- **技术栈导航**：大模型、框架、MCP、向量数据库、后端、前端、部署七大分类。
- **个人学习中心**：总体进度、阶段完成度图表（Recharts）、收藏、已完成项目与学习计划管理。
- **个性化路线**：按技术背景（Java/Python/Go/前端/PHP/零基础）生成推荐学习顺序。
- **响应式**：桌面端、平板与移动端自适应；深色/浅色主题。

## 技术栈

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · shadcn/ui · Lucide Icons · Recharts · Mermaid · next-themes

数据第一阶段采用本地 JSON + LocalStorage，已为接入 Supabase/PostgreSQL 预留扩展空间。

## 本地运行

> 项目配置了 `basePath: /agent-engineer-roadmap`，所有路由都位于该子路径下。

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
# 访问 http://localhost:3000/agent-engineer-roadmap
```

## 生产构建（静态导出）

```bash
npm run build   # 产物输出到 out/ 目录
```

## GitHub Pages 部署

站点已配置为静态导出，可部署到 `https://yuxinrun.github.io/agent-engineer-roadmap`。

- 推送代码到 `github.com/yuxinrun/agent-engineer-roadmap` 后，`.github/workflows/deploy.yml` 会自动构建并部署。
- 需在 GitHub 仓库 **Settings → Pages** 中将 Source 设为 **GitHub Actions**。

## Docker 部署

```bash
docker build -t agent-roadmap .
docker run -p 8080:80 agent-roadmap
# 访问 http://localhost:8080/agent-engineer-roadmap
```

## 部署到 Vercel

直接导入仓库即可（Vercel 会忽略 `output: "export"` 下的 `out/`，按需构建）。项目已内置 `sitemap.ts` 与 `robots.txt` 用于 SEO。

## 目录结构

```
src/
├── app/                 # 页面（App Router）
│   ├── roadmap/         # 学习路线 & 阶段详情
│   ├── resources/       # 资源库 & 资源详情
│   ├── projects/        # 项目库 & 项目详情
│   ├── tech-stack/      # 技术栈导航
│   ├── dashboard/       # 个人学习中心
│   ├── about/           # 关于本站
│   ├── sitemap.ts
│   └── layout.tsx
├── components/          # UI 组件（ui/ 为 shadcn 基础组件）
├── lib/
│   ├── data/            # 本地 JSON/TS 数据（roadmap/resources/projects/tech-stack）
│   ├── store/           # 状态管理 Context（进度/收藏/画像/项目）
│   ├── constants.ts     # 各类元信息映射
│   └── utils.ts         # 工具函数
```

## 数据维护

资源数据位于 `src/lib/data/` 下，结构已为后续接入数据库与管理后台预留。新增资源只需在 `resources.ts` 中追加一条记录即可。
