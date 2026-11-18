"use client";

import Text from "@/shared/components/atoms/Text";
import { useTranslations } from "next-intl";
import React from "react";

interface HeadingProps {
  name?: string;
}

const Heading = ({ name }: HeadingProps) => {
  const t = useTranslations("dashboard.home.heading");

  return (
    <div className="mb-11 md:mt-6">
      <h1 className="ds-text-primary ds-text-xl font-bold capitalize">{t("title")}</h1>

      <Text variant="disabled" size="md">
        {name ? t("welcomeMessage", { name }) : t("welcomeMessageNoName")}
      </Text>
    </div>
  );
};

export default Heading;
