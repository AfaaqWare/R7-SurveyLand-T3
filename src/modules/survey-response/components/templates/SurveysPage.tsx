"use client";

import { useState } from "react";
import SurveysHeader from "../orgamisms/SurveysHeader";
import SurveysToolbar from "../orgamisms/SurveysToolbar";
import SurveysGrid from "../orgamisms/SurveysGrid";
import type { SurveysSortOrder } from "../molecules/SurveySortSelect";
import NoSurvey from "../orgamisms/NoSurvey";
import useGetAllSurveys from "../../hooks/useGetAllSurveys";
import useSurveyStatus from "../../hooks/useSurveyStatus";

export default function SurveysPage() {
  const { status, handleStatusChange } = useSurveyStatus();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SurveysSortOrder>("newest");

  const { data, isLoading } = useGetAllSurveys();

  const surveys = data?.data ?? [];
  const hasSurveys = surveys.length > 0;

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
