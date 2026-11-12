"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/components/dynamic-icon";
import { useProfile } from "@/lib/store/profile-context";
import { BACKGROUND_META } from "@/lib/constants";
import type { BackgroundKey } from "@/lib/types";

const ORDER: BackgroundKey[] = [
  "java",
  "python",
  "go",
  "frontend",
  "php",
  "beginner",
];

export function BackgroundPicker() {
  const { profile, updateProfile, isHydrated } = useProfile();
  const [selected, setSelected] = React.useState<BackgroundKey | "">(
    profile.background
  );

  React.useEffect(() => {
    if (isHydrated) setSelected(profile.background);
  }, [isHydrated, profile.background]);

  const choose = (key: BackgroundKey) => {
    setSelected(key);
    updateProfile({ background: key });
  };

  const meta = selected ? BACKGROUND_META[selected] : null;

  return (
    <div className="rounded-xl border bg-card p-6">
      <h3 className="text-lg font-semibold mb-1">我的技术背景</h3>
      <p className="text-sm text-muted-foreground mb-4">
        选择你的背景，系统将记录并生成推荐路线（保存在本地浏览器）。
      </p>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {ORDER.map((key) => {
          const m = BACKGROUND_META[key];
          const active = selected === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => choose(key)}
              className={cn(
                "relative flex flex-col items-start gap-2 rounded-lg border p-3 text-left transition-all",
                active
                  ? "border-primary bg-accent ring-1 ring-primary"
                  : "hover:border-border/80 hover:bg-muted/40"
              )}
            >
              {active && (
                <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
              )}
              <DynamicIcon
                name={m.icon}
                className={cn("h-5 w-5", active ? "text-primary" : "text-muted-foreground")}
              />
              <span className="text-sm font-medium">{m.label}</span>
              <span className="text-[11px] text-muted-foreground leading-snug">
                {m.description}
              </span>
            </button>
          );
        })}
      </div>

      {meta && (
        <div className="mt-4 rounded-lg bg-muted/50 p-3 animate-fade-in">
          <p className="text-xs font-medium text-primary mb-1">推荐路线</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {meta.recommendation}
          </p>
        </div>
      )}

      <Link href="/roadmap" className="mt-4 block">
        <Button className="w-full">
          按我的背景开始学习
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
