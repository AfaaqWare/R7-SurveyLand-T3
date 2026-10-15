"use client";

import { useMemo } from "react";
import useGetAllSurveys from "@/modules/survey-response/hooks/useGetAllSurveys";
import {
  DASHBOARD_SURVEYS_PAGE,
  DASHBOARD_SURVEYS_PAGE_SIZE,
  countByStatus,
} from "../utils/dashboardStats";

export default function useSurveyStatusCounts() {
  const { data, isLoading, isError } = useGetAllSurveys(
    DASHBOARD_SURVEYS_PAGE,
    DASHBOARD_SURVEYS_PAGE_SIZE
  );

  const counts = useMemo(() => countByStatus(data?.data ?? []), [data]);

  return { counts, isLoading, isError };
}
