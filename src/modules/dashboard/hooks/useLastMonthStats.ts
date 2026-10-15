"use client";

import { useMemo } from "react";
import useGetAllResponses from "@/modules/responses/hooks/useGetAllResponses";
import useGetAllSurveys from "@/modules/survey-response/hooks/useGetAllSurveys";
import { useGetUsers } from "./useGetUsers";
import {
  DASHBOARD_SURVEYS_PAGE,
  DASHBOARD_SURVEYS_PAGE_SIZE,
  getLastMonthRange,
  getLastMonthStats,
} from "../utils/dashboardStats";

export default function useLastMonthStats() {
  const {
    data: surveysResponse,
    isLoading: loadingSurveys,
    isError: errorSurveys,
  } = useGetAllSurveys(DASHBOARD_SURVEYS_PAGE, DASHBOARD_SURVEYS_PAGE_SIZE);

  const {
    data: responsesResponse,
    isLoading: loadingResponses,
    isError: errorResponses,
  } = useGetAllResponses();

  const { data: users, isLoading: loadingUsers, isError: errorUsers } = useGetUsers();

  const stats = useMemo(
    () =>
      getLastMonthStats({
        surveys: surveysResponse?.data ?? [],
        responses: responsesResponse?.data ?? [],
        users: users ?? [],
        range: getLastMonthRange(),
      }),
    [surveysResponse, responsesResponse, users]
  );

  return {
    stats,
    isLoading: loadingSurveys || loadingResponses || loadingUsers,
    isError: errorSurveys || errorResponses || errorUsers,
  };
}
