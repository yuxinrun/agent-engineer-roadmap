import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StageDetail } from "@/components/roadmap/stage-detail";
import { roadmapStages, getStage } from "@/lib/data/roadmap";
import { absoluteUrl } from "@/lib/utils";

export function generateStaticParams() {
  return roadmapStages.map((stage) => ({ slug: stage.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const stage = getStage(params.slug);
  if (!stage) return {};
  return {
    title: `${stage.title}（阶段 ${stage.order}）`,
    description: stage.summary,
    alternates: {
      canonical: absoluteUrl(`/roadmap/${stage.slug}/`),
    },
  };
}

export default function StageDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const stage = getStage(params.slug);
  if (!stage) notFound();
  return <StageDetail stage={stage} />;
}
