import type { Metadata } from "next";
import PublicLayout from "@/shared/components/Layout/PublicLayout";
import HomeIntroSections from "@/modules/guest/components/organisms/home/HomeIntroSections";
import PopularTemplates from "@/modules/guest/components/organisms/home/PopularTemplates";
import HeroSection1 from "@/shared/components/organisms/HeroSection1";
import Cardsection from "@/shared/components/organisms/Cardsection";
import PricingSection from "@/modules/guest/components/organisms/home/PricingSection";
import { getSeoMetadata } from "@/core/seo/getSeoMetadata";

export const metadata: Metadata = getSeoMetadata({
  title: "project for team",
  description: "this project for training students ",
  keywords: ["project ", "team", "smart project"],
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
