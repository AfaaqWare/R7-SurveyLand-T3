"use client";
import HeroSection from "@/shared/components/organisms/HeroSection";
import { homehero } from "@/assets/images/images";
import Title from "@/shared/components/atoms/Title";
import Text from "@/shared/components/atoms/Text";
import ButtonGroup from "@/shared/components/molecules/ButtonGroup";
import { useTranslations } from "next-intl";
import Link from "@/shared/components/atoms/navbar/Link";

const HomeHeroSection = () => {
  const t = useTranslations("publicPages.home.hero-section");
  return (
    <HeroSection src={homehero} imgHeight={482} imgWidth={488}>
      <div className="flex flex-col gap-6">
        <Title size="xl" className="md:w-[90%]">
          {t.rich("title", {
            alt: chunks => <span className="ds-text-alt">{chunks}</span>,
          })}
        </Title>

        <Text size="md" variant="secondary" className="text-justify md:w-[60%]">
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
          }}
          button2={{
            variant: "outline1",
            children: t("how-work-btn"),
            size: "md",
            className: "!text-[var(--color-primary)]",
          }}
          gap={6}
        />
      </div>
    </HeroSection>
  );
};

export default HomeHeroSection;
