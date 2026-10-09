import { cn } from "@/lib/cn";
import Title from "@/shared/components/atoms/Title";
import Text from "@/shared/components/atoms/Text";
import StatusBadge from "@/shared/components/atoms/StatusBadge";
import DataTableHeader from "../molecules/DataTableHeader";
import { Table, TableBody, TableCell, TableRow } from "@/shared/components/molecules/Table";
import SectionHeader from "../molecules/SectionHeader";
import RecentSurveysSectionSkeleton from "./RecentSurveysSectionSkeleton";
import { Survey } from "@/modules/survey-response/types/survey";
import { formatDate } from "@/shared/utils/formatDate";
import { EmptyState, ErrorState } from "@/core/ui-states";
import { useTranslations } from "next-intl";

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
  const t = useTranslations();
  return (
    <section className={cn("ds-bg-card ds-rounded-3xl ds-p-lg", "w-full", className)}>
      {/* ==================== Header ==================== */}
      <SectionHeader title="recentSurveys" buttonLabel="viewAll" href="/dashboard/my-surveys" />

      {/* ==================== Content ==================== */}

      {isLoading && <RecentSurveysSectionSkeleton />}

      {/* Error State */}
      {!isLoading && isError && <ErrorState className="!m-h-50 !max-h-50" />}

      {/* Empty State */}
      {!isLoading && !isError && surveys.length === 0 && (
        <EmptyState className="!max-h-50 !min-h-50" />
      )}

      {/* ==================== Success State ==================== */}
      {!isLoading && !isError && surveys.length > 0 && (
        <>
          {/* ==================== Desktop / Tablet ==================== */}
          <div className="hidden overflow-x-auto md:block">
            <Table className="min-w-[650px]">
              {/* Table Header */}
              <DataTableHeader
                namespace="dashboard.home.recentSurveys.table"
                columns={["surveyTitle", "status", "responses", "updatedAt"]}
              />

              {/* Table Body */}
              <TableBody>
                {surveys.map(survey => (
                  <TableRow
                    key={survey.id}
                    className={cn(
                      "!border-b-2 !border-[var(--border-color-card)]",
                      "last:!border-b-0"
                    )}
                  >
                    {/* Survey Title */}
                    <TableCell>
                      <Title size="sm" className="font-semibold !text-[var(--color-text-dash)]">
                        {survey.title}
                      </Title>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <StatusBadge
                        className={`!rounded-lg ${survey.status === "closed" && "!bg-[##F4F5F7] dark:!bg-[#2C3039]"}`}
                        status={survey.status}
                      />
                    </TableCell>

                    {/* Responses */}
                    <TableCell>
                      <Text size="xs" className="font-semibold !text-[var(--color-text-dash)]">
                        {survey.responsesCount ?? 0}
                      </Text>
                    </TableCell>

                    {/* Updated At */}
                    <TableCell>
                      <Text size="xs" className="!font-semibold !text-[var(--color-text-dash)]">
                        {formatDate(survey.updatedAt)}
                      </Text>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* ==================== Mobile ==================== */}
          <div className="flex flex-col gap-3 md:hidden">
            {surveys.map(survey => (
              <article key={survey.id} className={cn("ds-border-card ds-rounded-md", "border p-4")}>
                {/* Survey Title */}
                <Title size="sm" className="mb-4 font-bold capitalize">
                  {survey.title}
                </Title>

                {/* Status */}
                <div className="flex items-center justify-between py-2">
                  <Text size="sm" variant="secondary">
                    Status
                  </Text>

                  <StatusBadge
                    className={`!rounded-lg ${survey.status === "closed" && "!bg-[##F4F5F7] dark:!bg-[#2C3039]"}`}
                    status={survey.status}
                  />
                </div>

                {/* Responses */}
                <div className="flex items-center justify-between py-2">
                  <Text size="sm" variant="secondary">
                    Responses
                  </Text>

                  <Text size="sm" className="!text-[var(--color-text-dash)]">
                    {survey.responsesCount ?? 0}
                  </Text>
                </div>

                {/* Updated At */}
                <div className="flex items-center justify-between py-2">
                  <Text size="sm" variant="secondary">
                    Updated At
                  </Text>

                  <Text size="sm" variant="secondary">
                    {formatDate(survey.updatedAt)}
                  </Text>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
