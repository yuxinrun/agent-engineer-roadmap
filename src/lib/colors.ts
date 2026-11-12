interface ColorSet {
  text: string;
  bg: string;
  bgSoft: string;
  border: string;
  dot: string;
  gradient: string;
}

/** 阶段/项目主题色映射（Tailwind 静态类名） */
export const COLOR_MAP: Record<string, ColorSet> = {
  blue: {
    text: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500",
    bgSoft: "bg-blue-500/10",
    border: "border-blue-500/30",
    dot: "bg-blue-500",
    gradient: "from-blue-500/20 to-blue-500/5",
  },
  indigo: {
    text: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-500",
    bgSoft: "bg-indigo-500/10",
    border: "border-indigo-500/30",
    dot: "bg-indigo-500",
    gradient: "from-indigo-500/20 to-indigo-500/5",
  },
  violet: {
    text: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-500",
    bgSoft: "bg-violet-500/10",
    border: "border-violet-500/30",
    dot: "bg-violet-500",
    gradient: "from-violet-500/20 to-violet-500/5",
  },
  sky: {
    text: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-500",
    bgSoft: "bg-sky-500/10",
    border: "border-sky-500/30",
    dot: "bg-sky-500",
    gradient: "from-sky-500/20 to-sky-500/5",
  },
  emerald: {
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500",
    bgSoft: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    dot: "bg-emerald-500",
    gradient: "from-emerald-500/20 to-emerald-500/5",
  },
  rose: {
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-500",
    bgSoft: "bg-rose-500/10",
    border: "border-rose-500/30",
    dot: "bg-rose-500",
    gradient: "from-rose-500/20 to-rose-500/5",
  },
  amber: {
    text: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500",
    bgSoft: "bg-amber-500/10",
    border: "border-amber-500/30",
    dot: "bg-amber-500",
    gradient: "from-amber-500/20 to-amber-500/5",
  },
  cyan: {
    text: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-500",
    bgSoft: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    dot: "bg-cyan-500",
    gradient: "from-cyan-500/20 to-cyan-500/5",
  },
  fuchsia: {
    text: "text-fuchsia-600 dark:text-fuchsia-400",
    bg: "bg-fuchsia-500",
    bgSoft: "bg-fuchsia-500/10",
    border: "border-fuchsia-500/30",
    dot: "bg-fuchsia-500",
    gradient: "from-fuchsia-500/20 to-fuchsia-500/5",
  },
  slate: {
    text: "text-slate-600 dark:text-slate-400",
    bg: "bg-slate-500",
    bgSoft: "bg-slate-500/10",
    border: "border-slate-500/30",
    dot: "bg-slate-500",
    gradient: "from-slate-500/20 to-slate-500/5",
  },
};

export function getColor(key: string): ColorSet {
  return COLOR_MAP[key] ?? COLOR_MAP.slate;
}
