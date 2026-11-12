import type { Metadata } from "next";
import { Dashboard } from "@/components/dashboard/dashboard";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "我的学习中心",
  description:
    "个人学习仪表盘：跟踪 AI Agent 学习进度、管理学习计划、收藏教程与记录已完成项目，数据保存在本地浏览器。",
  alternates: {
    canonical: absoluteUrl("/dashboard/"),
  },
};

export default function DashboardPage() {
  return <Dashboard />;
}
