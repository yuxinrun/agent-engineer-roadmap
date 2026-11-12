import { Hero } from "@/components/home/hero";
import {
  RoadmapOverviewSection,
  WhyAgentSection,
  FeaturedResourcesSection,
  FeaturedProjectsSection,
  LearningAdviceSection,
  ContributeSection,
} from "@/components/home/home-sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <RoadmapOverviewSection />
      <WhyAgentSection />
      <FeaturedResourcesSection />
      <FeaturedProjectsSection />
      <LearningAdviceSection />
      <ContributeSection />
    </>
  );
}
