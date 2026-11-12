"use client";

import * as React from "react";

const STORAGE_KEY = "agent-roadmap:completed-projects";

interface ProjectsContextValue {
  completedProjects: string[];
  toggleProject: (slug: string) => void;
  isCompleted: (slug: string) => boolean;
  isHydrated: boolean;
}

const ProjectsContext = React.createContext<ProjectsContextValue | null>(null);

function readStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function ProjectsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [completed, setCompleted] = React.useState<string[]>([]);
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    setCompleted(readStorage());
    setIsHydrated(true);
  }, []);

  const toggleProject = React.useCallback((slug: string) => {
    setCompleted((prev) => {
      const next = prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const isCompleted = React.useCallback(
    (slug: string) => completed.includes(slug),
    [completed]
  );

  return (
    <ProjectsContext.Provider
      value={{ completedProjects: completed, toggleProject, isCompleted, isHydrated }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const ctx = React.useContext(ProjectsContext);
  if (!ctx) {
    throw new Error("useProjects must be used within ProjectsProvider");
  }
  return ctx;
}
