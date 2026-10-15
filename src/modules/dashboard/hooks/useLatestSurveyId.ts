"use client";

import { useMemo } from "react";
import useGetAllSurveys from "@/modules/survey-response/hooks/useGetAllSurveys";
import {
  DASHBOARD_SURVEYS_PAGE,
  DASHBOARD_SURVEYS_PAGE_SIZE,
  getTopByDate,
} from "../utils/dashboardStats";

export default function useLatestSurveyId() {
  const { data, isLoading, isError } = useGetAllSurveys(
    DASHBOARD_SURVEYS_PAGE,
    DASHBOARD_SURVEYS_PAGE_SIZE
  );

  const latestSurveyId = useMemo(
    () => getTopByDate(data?.data ?? [], survey => survey.createdAt, 1)[0]?.id,
    [data]
  );

  return { latestSurveyId, isLoading, isError };
}
