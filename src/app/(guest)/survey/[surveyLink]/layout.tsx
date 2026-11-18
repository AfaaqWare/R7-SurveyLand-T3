import type { ReactNode } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildSeo } from "@/core/seo/Seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("surveyResponse.meta");

  return buildSeo({
    title: t("title"),
    description: t("description"),
    noIndex: true,
  });
}

export default function PublicSurveyLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
