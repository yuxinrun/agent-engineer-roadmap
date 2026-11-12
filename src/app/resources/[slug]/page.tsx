import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResourceDetail } from "@/components/resources/resource-detail";
import { resources, getResource } from "@/lib/data/resources";
import { absoluteUrl } from "@/lib/utils";

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const resource = getResource(params.slug);
  if (!resource) return {};
  return {
    title: resource.title,
    description: resource.description,
    alternates: {
      canonical: absoluteUrl(`/resources/${resource.slug}/`),
    },
  };
}

export default function ResourceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const resource = getResource(params.slug);
  if (!resource) notFound();
  return <ResourceDetail resource={resource} />;
}
