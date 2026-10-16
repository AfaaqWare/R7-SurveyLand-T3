"use client";

import { useMemo } from "react";
import useGetAllResponses from "@/modules/responses/hooks/useGetAllResponses";
import { getResponsesCountBySurveyId } from "@/modules/responses/utils/getResponsesCountBySurveyId";
import useGetAllSurveys from "@/modules/survey-response/hooks/useGetAllSurveys";
import {
  DASHBOARD_SURVEYS_PAGE,
  DASHBOARD_SURVEYS_PAGE_SIZE,
  getRecentSurveys,
} from "../utils/dashboardStats";

export default function useRecentSurveys() {
  const {
    data: surveysResponse,
    isLoading,
    isError,
  } = useGetAllSurveys(DASHBOARD_SURVEYS_PAGE, DASHBOARD_SURVEYS_PAGE_SIZE);

  const { data: responsesResponse } = useGetAllResponses();

  const responsesCountBySurveyId = useMemo(
    () => getResponsesCountBySurveyId(responsesResponse?.data ?? []),
    [responsesResponse]
  );

  const recentSurveys = useMemo(
    () => getRecentSurveys(surveysResponse?.data ?? [], responsesCountBySurveyId),
    [surveysResponse, responsesCountBySurveyId]
  );

  return { recentSurveys, isLoading, isError };
}
