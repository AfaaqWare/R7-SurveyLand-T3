"use client";

import useScrollToSection from "@/shared/hooks/useScrollToSection";
import HomeHeroSection from "./HomeHeroSection";
import WorkStepsSection from "./WorkStepsSection";

export default function HomeIntroSections() {
  const { sectionRef, scrollToSection } = useScrollToSection<HTMLDivElement>();

  return (
    <>
      <HomeHeroSection onHowItWorksClick={scrollToSection} />
      <WorkStepsSection sectionRef={sectionRef} />
    </>
  );
}
