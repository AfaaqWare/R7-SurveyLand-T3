"use client";

import { useTranslations } from "next-intl";

import { EmptyState } from "@/core/ui-states";

import Text from "@/shared/components/atoms/Text";
import { Table, TableBody, TableCell, TableRow } from "@/shared/components/molecules/Table";

import ResponseCard from "../molecules/ResponseCard";
import ResponsesTableFooter from "../molecules/ResponsesTableFooter";

import useIsDesktop from "@/shared/hooks/useIsDesktop";
import useInfiniteScrollSentinel from "@/shared/hooks/useInfiniteScrollSentinel";
import useResponsesTableData from "../../hooks/useResponsesTableData";

import { formatDateTime } from "@/shared/utils/formatDateTime";

import type { SurveyResponse } from "@/modules/responses/type/responses";
import type { SurveyQuestion } from "../../types/question";
import DataTableHeader from "@/modules/dashboard/components/molecules/DataTableHeader";
import { cn } from "@/lib/cn";

interface ResponsesTableProps {
  rows: SurveyResponse[];
  questions: SurveyQuestion[];
}

export default function ResponsesTable({ rows, questions }: ResponsesTableProps) {
  const t = useTranslations("dashboard.surveysExport.responsesTable");

  const isDesktop = useIsDesktop();

  const { visibleRows, page, setPage, totalPages, hasMore, loadMore, start, end } =
    useResponsesTableData({
      rows,
      isDesktop,
    });

  const sentinelRef = useInfiniteScrollSentinel({
    enabled: !isDesktop,
    onIntersect: loadMore,
  });

  if (rows.length === 0) {
    return <EmptyState />;
  }

  const columns = [
    t("columns.id"),
    t("columns.respondentName"),
    t("columns.respondentEmail"),
    ...questions.map(question => question.questionText),
    t("columns.submittedAt"),
  ];

  return (
    <div className="mt-4">
      {isDesktop ? (
        <div className="ds-bg ds-border-card [&_th]:ds-text-xs [&_th]:ds-text-secondary [&_td]:ds-text-xs overflow-hidden rounded-t-lg [&_table]:min-w-max [&_tbody_tr]:!border-[var(--border-color-card)] [&_tbody_tr]:transition-colors [&_tbody_tr:hover_td]:bg-[color-mix(in_srgb,var(--color-primary)_4%,var(--color-bg-card))] [&_tbody_tr:last-child]:!border-b-0 [&_td]:!px-4 [&_td]:!py-2 [&_td]:!font-semibold [&_th]:!px-4 [&_th]:!py-5 [&_th]:font-semibold [&_tr]:!border-b-5">
          <Table>
            <DataTableHeader
              className={cn("!ds-border-secondary !border-2 !bg-[var(--color-bg-table)]")}
              columns={columns}
              isDynamicData
              namespace=""
            />

            <TableBody>
              {visibleRows.map((response, index) => {
                const { date, time } = formatDateTime(response.submittedAt);

                const rowNumber = start + index;

                return (
                  <TableRow key={response.id}>
                    {/* ID */}
                    <TableCell>
                      <Text
                        size="xs"
                        className="font-bold !text-[var(--color-text-dash-secondary)]"
                      >
                        {rowNumber}
                      </Text>
                    </TableCell>

                    {/* Respondent Name */}
                    <TableCell>
                      <Text size="xs" className="!text-[var(--color-text-dash-secondary)]">
                        {response.respondentName}
                      </Text>
                    </TableCell>

                    {/* Respondent Email */}
                    <TableCell>
                      <a
                        href={`mailto:${response.respondentEmail}`}
                        className="inline-block underline underline-offset-2"
                      >
                        <Text size="xs" className="!text-[var(--color-text-dash-secondary)]">
                          {response.respondentEmail}
                        </Text>
                      </a>
                    </TableCell>

                    {/* Dynamic Questions */}
                    {questions.map((question, questionIndex) => (
                      <TableCell key={`${question.qid}-${questionIndex}`}>
                        <Text size="xs" className="!text-[var(--color-text-dash-secondary)]">
                          {response.answers[question.qid] || t("noAnswer")}
                        </Text>
                      </TableCell>
                    ))}

                    {/* Submitted At */}
                    <TableCell>
                      <div className="flex flex-col">
                        <Text size="xs" className="!text-[var(--color-text-dash-secondary)]">
                          {date}
                        </Text>

                        <Text size="xs" variant="secondary">
                          {time}
                        </Text>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {visibleRows.map((response, index) => (
            <ResponseCard
              key={response.id}
              response={response}
              index={index + 1}
              questions={questions}
            />
          ))}
        </div>
      )}
      <div className="p-3">
        <ResponsesTableFooter
          isDesktop={isDesktop}
          hasMore={hasMore}
          sentinelRef={sentinelRef}
          page={page}
          totalPages={totalPages}
          start={start}
          end={end}
          total={rows.length}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
