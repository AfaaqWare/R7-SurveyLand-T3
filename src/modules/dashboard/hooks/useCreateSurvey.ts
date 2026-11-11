import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { createSurveyApi } from "../api/createSurveyApi";

import { useQueryClient } from "@tanstack/react-query";

export function useCreateSurvey() {
  const queryClient = useQueryClient();

  return useApiMutation({
    mutationFn: createSurveyApi,
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["surveys"] });
      },
    },
  });
}
