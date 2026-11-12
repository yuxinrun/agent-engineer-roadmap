"use client";

import * as React from "react";
import type { PointStatus } from "@/lib/types";

const STORAGE_KEY = "agent-roadmap:progress";

export type ProgressMap = Record<string, PointStatus>;

interface ProgressContextValue {
  progress: ProgressMap;
  setStatus: (id: string, status: PointStatus) => void;
  cycleStatus: (id: string) => void;
  resetAll: () => void;
  isHydrated: boolean;
}

const ProgressContext = React.createContext<ProgressContextValue | null>(null);

function readStorage(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

export function ProgressProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [progress, setProgress] = React.useState<ProgressMap>({});
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    setProgress(readStorage());
    setIsHydrated(true);
  }, []);

  const persist = (next: ProgressMap) => {
    setProgress(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore quota errors
    }
  };

  const setStatus = React.useCallback(
    (id: string, status: PointStatus) => {
      setProgress((prev) => {
        const next = { ...prev, [id]: status };
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
    },
    []
  );

  const cycleStatus = React.useCallback((id: string) => {
    setProgress((prev) => {
      const order: PointStatus[] = [
        "not-started",
        "in-progress",
        "completed",
      ];
      const current = prev[id] ?? "not-started";
      const nextStatus = order[(order.indexOf(current) + 1) % order.length];
      const next = { ...prev, [id]: nextStatus };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const resetAll = React.useCallback(() => {
    persist({});
  }, []);

  return (
    <ProgressContext.Provider
      value={{ progress, setStatus, cycleStatus, resetAll, isHydrated }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = React.useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used within ProgressProvider");
  }
  return ctx;
}
