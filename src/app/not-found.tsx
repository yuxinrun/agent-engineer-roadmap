import Link from "next/link";
import { Map } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center py-24 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-primary">
        <Map className="h-7 w-7" />
      </span>
      <h1 className="mt-6 text-3xl font-bold tracking-tight">页面未找到</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        你访问的页面不存在或已被移动。返回首页，继续你的 AI Agent 学习之旅。
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/">
          <Button>返回首页</Button>
        </Link>
        <Link href="/roadmap">
          <Button variant="outline">查看学习路线</Button>
        </Link>
      </div>
    </div>
  );
}
