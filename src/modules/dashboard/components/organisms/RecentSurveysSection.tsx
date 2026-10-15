import RecentDataSection from "./RecentDataSection";
import RecentSurveysSectionSkeleton from "./RecentSurveysSectionSkeleton";
import { recentSurveysConfig } from "../../utils/data";
import type { Survey } from "@/modules/survey-response/types/survey";

interface RecentSurveysSectionProps {
  surveys?: Survey[];
  isLoading?: boolean;
  isError?: boolean;
  className?: string;
}

export default function RecentSurveysSection({
  surveys = [],
  isLoading = false,
  isError = false,
  className,
}: RecentSurveysSectionProps) {
  return (
    <RecentDataSection
      items={surveys}
      config={recentSurveysConfig}
      skeleton={<RecentSurveysSectionSkeleton />}
      isLoading={isLoading}
      isError={isError}
      className={className}
    />
  );
}
