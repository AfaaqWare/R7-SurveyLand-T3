"use client";

import { useMemo } from "react";
import useGetAllResponses from "@/modules/responses/hooks/useGetAllResponses";
import useGetAllSurveys from "@/modules/survey-response/hooks/useGetAllSurveys";
import { getSurveyTitleBySurveyId } from "@/modules/survey-response/utils/getSurveyTitleBySurveyId";
import {
  DASHBOARD_SURVEYS_PAGE,
  DASHBOARD_SURVEYS_PAGE_SIZE,
  getRecentResponses,
} from "../utils/dashboardStats";

export default function useRecentResponses() {
  const { data: responsesResponse, isLoading, isError } = useGetAllResponses();

  const { data: surveysResponse } = useGetAllSurveys(
    DASHBOARD_SURVEYS_PAGE,
    DASHBOARD_SURVEYS_PAGE_SIZE
  );

  const surveyTitleBySurveyId = useMemo(
    () => getSurveyTitleBySurveyId(surveysResponse?.data ?? []),
    [surveysResponse]
  );

  const recentResponses = useMemo(
    () => getRecentResponses(responsesResponse?.data ?? [], surveyTitleBySurveyId),
    [responsesResponse, surveyTitleBySurveyId]
  );

  return { recentResponses, isLoading, isError };
}
