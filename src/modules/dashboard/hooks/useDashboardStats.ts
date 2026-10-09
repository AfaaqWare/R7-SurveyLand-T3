import { useGetUsers } from "@/modules/dashboard/hooks/useGetUsers";
import useGetAllResponses from "@/modules/responses/hooks/useGetAllResponses";
import { getResponsesCountBySurveyId } from "@/modules/responses/utils/getResponsesCountBySurveyId";
import useGetAllSurveys from "@/modules/survey-response/hooks/useGetAllSurveys";

export default function useDashboardStats() {
  const {
    data: surveysResponse,
    isLoading: loadingRecentSurveys,
    isError: errorRecentSurveys,
  } = useGetAllSurveys(1, 100);

  const surveys = surveysResponse?.data;

  const { data: users } = useGetUsers();

  const {
    data: responses,
    isLoading: loadingRecentResponses,
    isError: errorRecentResponses,
  } = useGetAllResponses();

  const now = new Date();
  const lastMonth = new Date();
  lastMonth.setMonth(now.getMonth() - 1);

  const lastMonthtUsers = users?.filter(user => {
    const createdAt = new Date(user.createdAt);
    return createdAt >= lastMonth && createdAt <= now;
  });
  const totalLastMonthUsers = lastMonthtUsers?.length ?? 0;

  const lastMonthResponses =
    responses?.data?.filter(response => {
      const submittedAt = new Date(response.submittedAt);
      return submittedAt >= lastMonth && submittedAt <= now;
    }) ?? [];

  const TotalLastMonthResponses = lastMonthResponses?.length ?? 0;

  const lastMonthSurveys =
    surveys?.filter(survey => {
      const createdAt = new Date(survey.createdAt);
      return createdAt >= lastMonth && createdAt <= now;
    }) ?? [];
  const totalLastMonthSurveys = lastMonthSurveys?.length ?? 0;

  const lastMonthPublishedSurveys =
    lastMonthSurveys?.filter(recentSurvey => {
      return recentSurvey.status.toLocaleLowerCase() === "published";
    }) ?? [];

  const totalLastMonthPublishedSurveys = lastMonthPublishedSurveys?.length ?? 0;

  const lastMontDraftSurveys =
    lastMonthSurveys?.filter(recentSurvey => {
      return recentSurvey.status.toLocaleLowerCase() === "draft";
    }) ?? [];

  const totalLastMonthDraftSurveys = lastMontDraftSurveys?.length ?? 0;
  const responsesCountBySurveyId = getResponsesCountBySurveyId(responses?.data ?? []);

  const recentSurveys =
    surveys
      ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 4)
      .map(survey => ({
        ...survey,
        responsesCount: responsesCountBySurveyId.get(survey.id) ?? 0,
      })) ?? [];

  const recentResponses =
    responses?.data
      ?.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
      .slice(0, 4) ?? [];

  const totalDraftSurveys = surveys?.filter(survey => survey.status === "draft").length ?? 0;

  const totalPublishedSurveys =
    surveys?.filter(survey => survey.status === "published").length ?? 0;

  const totalClosedSurveys = surveys?.filter(survey => survey.status === "closed").length ?? 0;

  return {
    totalLastMonthUsers,
    recentResponses,
    totalLastMonthSurveys,
    totalLastMonthPublishedSurveys,
    totalLastMonthDraftSurveys,
    recentSurveys,
    TotalLastMonthResponses,
    surveys,
    totalClosedSurveys,
    totalPublishedSurveys,
    totalDraftSurveys,
    responses,
    errorRecentSurveys,
    loadingRecentSurveys,
    errorRecentResponses,
    loadingRecentResponses,
  };
}
