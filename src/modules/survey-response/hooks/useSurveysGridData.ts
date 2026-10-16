import { useCallback, useEffect, useMemo, useState } from "react";
import useGetAllSurveys from "./useGetAllSurveys";

import useGetAllResponses from "@/modules/responses/hooks/useGetAllResponses";
import { getResponsesCountBySurveyId } from "@/modules/responses/utils/getResponsesCountBySurveyId";
import type { SurveyStatusFilter } from "../components/molecules/SurveyStatusTabs";
import type { SurveysSortOrder } from "../components/molecules/SurveySortSelect";
import type { Survey } from "../types/survey";

export const SURVEYS_GRID_PAGE_SIZE = 6;

const FETCH_ALL_PAGE_SIZE = 1000;

interface UseSurveysGridDataParams {
  status: SurveyStatusFilter;
  search: string;
  sort: SurveysSortOrder;
  isDesktop: boolean;
}

function filterAndSortSurveys(
  surveys: Survey[],
  status: SurveyStatusFilter,
  search: string,
  sort: SurveysSortOrder
) {
  let result = surveys;

  if (status !== "all") {
    result = result.filter(survey => survey.status === status);
  }

  const query = search.trim().toLowerCase();
  if (query) {
    result = result.filter(survey => survey.title.toLowerCase().includes(query));
  }

  return [...result].sort((a, b) => {
    const aTime = new Date(a.updatedAt).getTime();
    const bTime = new Date(b.updatedAt).getTime();
    return sort === "newest" ? bTime - aTime : aTime - bTime;
  });
}

export default function useSurveysGridData({
  status,
  search,
  sort,
  isDesktop,
}: UseSurveysGridDataParams) {
  const [page, setPage] = useState(1);
  const [visibleCount, setVisibleCount] = useState(SURVEYS_GRID_PAGE_SIZE);

  const { data: result, isLoading, isError, refetch } = useGetAllSurveys(1, FETCH_ALL_PAGE_SIZE);
  const { data: responsesResult } = useGetAllResponses();

  const responsesCountBySurveyId = useMemo(
    () => getResponsesCountBySurveyId(responsesResult?.data ?? []),
    [responsesResult]
  );

  const surveysWithResponseCounts = useMemo(() => {
    const surveys = result?.data ?? [];
    return surveys.map(survey => ({
      ...survey,
      responsesCount: responsesCountBySurveyId.get(survey.id) ?? 0,
    }));
  }, [result, responsesCountBySurveyId]);

  const filteredSurveys = useMemo(
    () => filterAndSortSurveys(surveysWithResponseCounts, status, search, sort),
    [surveysWithResponseCounts, status, search, sort]
  );

  const totalPages = Math.max(1, Math.ceil(filteredSurveys.length / SURVEYS_GRID_PAGE_SIZE));

  useEffect(() => {
    setPage(1);
    setVisibleCount(SURVEYS_GRID_PAGE_SIZE);
  }, [status, search, sort]);

  useEffect(() => {
    setPage(current => Math.min(current, totalPages));
  }, [totalPages]);

  const visibleSurveys = useMemo(
    () =>
      isDesktop
        ? filteredSurveys.slice((page - 1) * SURVEYS_GRID_PAGE_SIZE, page * SURVEYS_GRID_PAGE_SIZE)
        : filteredSurveys.slice(0, visibleCount),
    [filteredSurveys, isDesktop, page, visibleCount]
  );

  const hasMore = !isDesktop && visibleCount < filteredSurveys.length;

  const loadMore = useCallback(() => {
    setVisibleCount(count => Math.min(count + SURVEYS_GRID_PAGE_SIZE, filteredSurveys.length));
  }, [filteredSurveys.length]);

  const start = (page - 1) * SURVEYS_GRID_PAGE_SIZE + 1;
  const end = Math.min(page * SURVEYS_GRID_PAGE_SIZE, filteredSurveys.length);

  return {
    result,
    isLoading,
    isError,
    refetch,
    filteredSurveys,
    visibleSurveys,
    page,
    setPage,
    totalPages,
    hasMore,
    loadMore,
    start,
    end,
  };
}
