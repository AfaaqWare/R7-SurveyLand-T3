import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { TokenService } from "@/services/tokenService";
import { useQueryClient } from "@tanstack/react-query";

export const useLogoutApi = () => {
  const queryClient = useQueryClient();
  return useApiMutation<undefined, string>({
    mutationFn: async () => {
      TokenService.removeToken();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      return "Logged out successfully";
    },

    options: {
      onSuccess: () => {
        queryClient.clear();
      },
    },
  });
};
