import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildSeo } from "@/core/seo/Seo";
import ExportResponsesPage from "@/modules/survey-response/components/templates/ExportResponsesPage";

type ExportResponsesRouteProps = {
  params: Promise<{
    surveyId: string;
  }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("dashboard.surveysExport.meta");

  return buildSeo({
    title: t("title"),
    description: t("description"),
    noIndex: true,
  });
}

export default async function ExportResponsesRoute({ params }: ExportResponsesRouteProps) {
  const { surveyId } = await params;

  return <ExportResponsesPage surveyId={surveyId} />;
}
