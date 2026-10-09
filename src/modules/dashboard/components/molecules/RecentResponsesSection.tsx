import { cn } from "@/lib/cn";
import Title from "@/shared/components/atoms/Title";
import Text from "@/shared/components/atoms/Text";
import DataTableHeader from "./DataTableHeader";
import { Table, TableBody, TableCell, TableRow } from "@/shared/components/molecules/Table";
import SectionHeader from "./SectionHeader";
import { RecentSurveyResponse } from "@/modules/responses/type/responses";
import { formatDate } from "@/shared/utils/formatDate";
import { EmptyState, ErrorState } from "@/core/ui-states";
import { useTranslations } from "next-intl";

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
  const t = useTranslations();
  return (
    <section className={cn("ds-bg-card ds-rounded-3xl ds-p-lg", "w-full", className)}>
      {/* ==================== Header ==================== */}
      <SectionHeader title="recentResponses" buttonLabel="viewAll" href="/dashboard/responses" />

      {/* ==================== Loading State ==================== */}
      {isLoading && (
        <div className="flex min-h-[250px] items-center justify-center">
          <Text size="sm" variant="secondary">
            {t("ui-state.loading")}
          </Text>
        </div>
      )}

      {/* ==================== Error State ==================== */}
      {!isLoading && isError && <ErrorState className="!m-h-50 !max-h-50" />}

      {/* ==================== Empty State ==================== */}
      {!isLoading && !isError && responses.length === 0 && (
        <EmptyState className="!max-h-50 !min-h-50" />
      )}

      {/* ==================== Success State ==================== */}
      {!isLoading && !isError && responses.length > 0 && (
        <>
          {/* ==================== Desktop / Tablet ==================== */}
          <div className="hidden overflow-x-auto md:block">
            <Table className="min-w-[650px]">
              <DataTableHeader
                namespace="dashboard.home.responses.table"
                columns={["surveyTitle", "respondent", "responsePreview", "submittedAt"]}
              />

              <TableBody>
                {responses.map(response => (
                  <TableRow
                    key={response.id}
                    className={cn(
                      "!border-b-2 !border-[var(--border-color-card)]",
                      "last:!border-b-0"
                    )}
                  >
                    {/* Survey Title */}
                    <TableCell>
                      <Title size="sm" className="font-semibold !text-[var(--color-text-dash)]">
                        {response.surveyTitle || "No Title"}
                      </Title>
                    </TableCell>

                    {/* Respondent */}
                    <TableCell>
                      <Text
                        size="sm"
                        className="font-semibold whitespace-nowrap !text-[var(--color-text-dash)]"
                      >
                        {response.respondentName}
                      </Text>
                    </TableCell>

                    {/* Response Preview */}
                    <TableCell>
                      <Text
                        size="xs"
                        className="!ds-text-dash max-w-[250px] truncate font-semibold !text-[var(--color-text-dash)]"
                      >
                        {"very satisfied"}
                      </Text>
                    </TableCell>

                    {/* Submitted At */}
                    <TableCell>
                      <Text
                        size="xs"
                        className="!font-semibold whitespace-nowrap !text-[var(--color-text-dash)]"
                      >
                        {formatDate(response.submittedAt)}
                      </Text>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* ==================== Mobile ==================== */}
          <div className="flex flex-col gap-3 md:hidden">
            {responses.map(response => (
              <article
                key={response.id}
                className={cn("ds-border-card ds-rounded-md", "border p-4")}
              >
                {/* Survey Title */}
                <Title size="sm" className="mb-4 font-bold">
                  {response.surveyTitle || "No Title"}
                </Title>

                {/* Respondent */}
                <div className="flex items-center justify-between py-2">
                  <Text size="sm" variant="secondary">
                    Respondent
                  </Text>

                  <div className="flex items-center gap-2">
                    <Text size="sm" className="!text-[var(--color-text-dash)]">
                      {response.respondentName}
                    </Text>
                  </div>
                </div>

                {/* Response Preview */}
                <div className="flex items-start justify-between gap-4 py-2">
                  <Text size="sm" variant="secondary">
                    Response
                  </Text>

                  <Text size="sm" className="max-w-[60%] text-right !text-[var(--color-text-dash)]">
                    {"very satisfied"}
                  </Text>
                </div>

                {/* Submitted At */}
                <div className="flex items-center justify-between py-2">
                  <Text size="sm" variant="secondary">
                    Submitted At
                  </Text>

                  <Text size="sm" className="!text-[var(--color-text-dash)]">
                    {formatDate(response.submittedAt)}
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
