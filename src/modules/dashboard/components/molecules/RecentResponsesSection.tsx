import RecentDataSection from "../organisms/RecentDataSection";
import RecentResponsesSectionSkeleton from "./RecentResponsesSectionSkeleton";
import { recentResponsesConfig } from "../../utils/data";
import type { RecentSurveyResponse } from "@/modules/responses/type/responses";

interface RecentResponsesSectionProps {
  responses?: RecentSurveyResponse[];
  isLoading?: boolean;
  isError?: boolean;
  className?: string;
}

export default function RecentResponsesSection({
  responses = [],
  isLoading = false,
  isError = false,
  className,
}: RecentResponsesSectionProps) {
  return (
    <RecentDataSection
      items={responses}
      config={recentResponsesConfig}
      skeleton={<RecentResponsesSectionSkeleton />}
      isLoading={isLoading}
      isError={isError}
      className={className}
    />
  );
}
