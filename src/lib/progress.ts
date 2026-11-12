import { roadmapStages } from "@/lib/data/roadmap";
import type { ProgressMap } from "@/lib/store/progress-context";
import type { RoadmapStage } from "@/lib/types";

export interface StageProgress {
  stage: RoadmapStage;
  total: number;
  completed: number;
  inProgress: number;
  percent: number;
}

export interface OverallProgress {
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  percent: number;
  stages: StageProgress[];
}

export function computeOverallProgress(progress: ProgressMap): OverallProgress {
  let total = 0;
  let completed = 0;
  let inProgress = 0;

  const stages: StageProgress[] = roadmapStages.map((stage) => {
    const points = stage.knowledgePoints;
    const totalPts = points.length;
    let done = 0;
    let doing = 0;

    points.forEach((p) => {
      const s = progress[p.id];
      if (s === "completed") done++;
      else if (s === "in-progress") doing++;
    });

    total += totalPts;
    completed += done;
    inProgress += doing;

    return {
      stage,
      total: totalPts,
      completed: done,
      inProgress: doing,
      percent: totalPts ? Math.round((done / totalPts) * 100) : 0,
    };
  });

  const notStarted = total - completed - inProgress;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  return { total, completed, inProgress, notStarted, percent, stages };
}

export function computeStageProgress(
  stage: RoadmapStage,
  progress: ProgressMap
): StageProgress {
  const points = stage.knowledgePoints;
  const total = points.length;
  let completed = 0;
  let inProgress = 0;

  points.forEach((p) => {
    const s = progress[p.id];
    if (s === "completed") completed++;
    else if (s === "in-progress") inProgress++;
  });

  return {
    stage,
    total,
    completed,
    inProgress,
    percent: total ? Math.round((completed / total) * 100) : 0,
  };
}
