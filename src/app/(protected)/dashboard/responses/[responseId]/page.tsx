import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildSeo } from "@/core/seo/Seo";
import DetailsResponsePage from "@/modules/responses/components/templates/DetailsResponsePage";

type ResponseDetailsRouteProps = {
  params: Promise<{
    responseId: string;
  }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("dashboard.responses.detailsResponse.meta");

  return buildSeo({
    title: t("title"),
    description: t("description"),
    noIndex: true,
  });
}

export default async function ResponseDetailsRoute({ params }: ResponseDetailsRouteProps) {
  const { responseId } = await params;

  return <DetailsResponsePage responseId={responseId} />;
}
