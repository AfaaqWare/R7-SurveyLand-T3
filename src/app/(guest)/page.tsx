import type { Metadata } from "next";
import PublicLayout from "@/shared/components/Layout/PublicLayout";
import HomeIntroSections from "@/modules/guest/components/organisms/home/HomeIntroSections";
import PopularTemplates from "@/modules/guest/components/organisms/home/PopularTemplates";
import Cardsection from "@/shared/components/organisms/Cardsection";
import PricingSection from "@/modules/guest/components/organisms/home/PricingSection";
import { getSeoMetadata } from "@/core/seo/getSeoMetadata";

export const metadata: Metadata = getSeoMetadata({
  title: "SurveyLand - Create and Share Surveys",
  description: "SurveyLand is a modern survey platform to create surveys, collect responses, and analyze results with ease.",
  keywords: ["SurveyLand", "survey platform", "create surveys", "collect responses"],
});

export default function Page() {
  return (
    <PublicLayout>
      <HomeIntroSections />
      <PopularTemplates />
      <Cardsection />
      <PricingSection />
    </PublicLayout>
  );
}
