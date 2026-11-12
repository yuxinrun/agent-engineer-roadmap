import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";
import { roadmapStages } from "@/lib/data/roadmap";
import { resources } from "@/lib/data/resources";
import { projects } from "@/lib/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/roadmap",
    "/resources",
    "/projects",
    "/tech-stack",
    "/dashboard",
    "/about",
  ].map((path) => ({
    url: absoluteUrl(`${path}/`),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const stagePages: MetadataRoute.Sitemap = roadmapStages.map((s) => ({
    url: absoluteUrl(`/roadmap/${s.slug}/`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const resourcePages: MetadataRoute.Sitemap = resources.map((r) => ({
    url: absoluteUrl(`/resources/${r.slug}/`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: absoluteUrl(`/projects/${p.slug}/`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...stagePages, ...resourcePages, ...projectPages];
}
