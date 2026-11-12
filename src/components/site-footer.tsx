import Link from "next/link";
import { Github, Map } from "lucide-react";

const FOOTER_GROUPS = [
  {
    title: "学习路线",
    links: [
      { href: "/roadmap", label: "完整学习路线" },
      { href: "/roadmap/programming-and-llm-basics", label: "阶段一：基础" },
      { href: "/roadmap/llm-app-development", label: "阶段二：LLM应用" },
      { href: "/roadmap/agent-core-principles", label: "阶段三：Agent原理" },
    ],
  },
  {
    title: "资源",
    links: [
      { href: "/resources", label: "教程资源库" },
      { href: "/projects", label: "实战项目" },
      { href: "/tech-stack", label: "技术栈导航" },
    ],
  },
  {
    title: "关于",
    links: [
      { href: "/dashboard", label: "我的学习中心" },
      { href: "/about", label: "关于本站" },
      { href: "/about#contribute", label: "资源贡献" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-blue via-brand-indigo to-brand-violet text-white">
                <Map className="h-4 w-4" />
              </span>
              <span className="text-sm font-semibold">Agent 学习地图</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              一站式 AI Agent 学习路线，帮助普通程序员在 16~24
              周内系统掌握 Agent 开发能力，成为合格的 AI Agent 工程师。
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
              项目 GitHub
            </a>
          </div>

          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="mb-3 text-sm font-semibold">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Agent 学习地图 · AI Agent Engineer
            Roadmap
          </p>
          <p>仅供学习交流，资源版权归原作者所有</p>
        </div>
      </div>
    </footer>
  );
}
