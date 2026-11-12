"use client";

import { useState } from "react";
import SurveysHeader from "../orgamisms/SurveysHeader";
import SurveysToolbar from "../orgamisms/SurveysToolbar";
import SurveysGrid from "../orgamisms/SurveysGrid";
import type { SurveysSortOrder } from "../molecules/SurveySortSelect";
import NoSurvey from "../orgamisms/NoSurvey";
import useGetAllSurveys from "../../hooks/useGetAllSurveys";
import { FETCH_ALL_PAGE_SIZE } from "../../hooks/useSurveysGridData";
import { ErrorState } from "@/core/ui-states";
import useSurveyStatus from "../../hooks/useSurveyStatus";

export default function SurveysPage() {
  const { status, handleStatusChange } = useSurveyStatus();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SurveysSortOrder>("newest");

  const { data, isLoading, isError, refetch } = useGetAllSurveys(1, FETCH_ALL_PAGE_SIZE);

  const surveys = data?.data ?? [];
  const hasSurveys = surveys.length > 0;

  if (isError && !data) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <div>
      {hasSurveys || isLoading ? (
        <>
          <SurveysHeader />

          <SurveysToolbar
            status={status}
            onStatusChange={handleStatusChange}
            search={search}
            onSearchChange={setSearch}
            sort={sort}
            onSortChange={setSort}
          />

          <SurveysGrid status={status} search={search} sort={sort} />
        </>
      ) : (
        <NoSurvey />
      )}
    </div>
  );
}
