"use client";
import HeroSection from "@/shared/components/organisms/HeroSection";
import { homehero } from "@/assets/images/images";
import Title from "@/shared/components/atoms/Title";
import Text from "@/shared/components/atoms/Text";
import ButtonGroup from "@/shared/components/molecules/ButtonGroup";
import { useTranslations } from "next-intl";
import Link from "@/shared/components/atoms/navbar/Link";

interface HomeHeroSectionProps {
  onHowItWorksClick?: () => void;
}

const HomeHeroSection = ({ onHowItWorksClick }: HomeHeroSectionProps) => {
  const t = useTranslations("publicPages.home.hero-section");
  return (
    <div className="!ds-bg-alt mb-20 !w-screen pt-30 lg:pt-0">
      <HeroSection src={homehero} imgHeight={482} imgWidth={488}>
        <div className="!lg:justify-start flex flex-col gap-6">
          <Title size="xl" className="md:w-[90%]">
            {t.rich("title", {
              alt: chunks => <span className="ds-text-alt">{chunks}</span>,
            })}
          </Title>

          <Text size="md" variant="secondary" className="!leading-tight md:w-[60%]">
            {t("description")}
          </Text>

          <ButtonGroup
            button1={{
              variant: "primaryWhite",
              children: (
                <Link href="/dashboard/create-survey" className="pb-0 !text-inherit !no-underline">
                  {t("create-btn")}
                </Link>
              ),
              size: "md",
              className: "sm:w-fit w-full",
            }}
            button2={{
              variant: "outline1",
              children: t("how-work-btn"),
              size: "md",
              className: "sm:w-fit  w-full !text-[var(--color-primary)]",
              onClick: onHowItWorksClick,
            }}
            gap={6}
          />
        </div>
      </HeroSection>
    </div>
  );
};

export default HomeHeroSection;
