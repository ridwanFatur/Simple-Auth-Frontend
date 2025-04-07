import { apiClient } from "@/data/helpers/clients/api_client";

const VerificationRepo = {
  verify: async (params: { code: string; email: string }) => {
    return await apiClient({
      path: "/api/v1/settings/verification/verify/",
      method: "post",
      requestBody: params,
    });
  },

  send_email: async () => {
    return await apiClient({
      path: "/api/v1/settings/verification/send_email/",
      method: "post",
    });
  },
};

export default VerificationRepo;
