import { apiClient } from "@/data/helpers/clients/api_client";
import { UserWithTokenModel } from "@/domain/models/user/user_model";

const AuthRepo = {
  PasswordMethod: {
    signIn: async (params: { password: string; email: string }) => {
      return await apiClient<UserWithTokenModel>({
        path: "/api/v1/user/auth/signin/",
        method: "post",
        requestBody: params,
      });
    },

    signUp: async (params: {
      password: string;
      email: string;
      full_name: string;
      role: "user" | "admin";
    }) => {
      return await apiClient<UserWithTokenModel>({
        path: "/api/v1/user/auth/signup/",
        method: "post",
        requestBody: params,
      });
    },
  },

  GoogleMethod: {
    signIn: async (params: { auth_code: string }) => {
      return await apiClient<UserWithTokenModel>({
        path: "/api/v1/user/google_auth/signin/",
        method: "post",
        requestBody: params,
      });
    },

    signUp: async (params: { auth_code: string; role: "user" | "admin" }) => {
      return await apiClient<UserWithTokenModel>({
        path: "/api/v1/user/google_auth/signup/",
        method: "post",
        requestBody: params,
      });
    },
  },

  MicrosoftMethod: {
    signIn: async (params: { auth_code: string }) => {
      return await apiClient<UserWithTokenModel>({
        path: "/api/v1/user/microsoft_auth/signin/",
        method: "post",
        requestBody: params,
      });
    },

    signUp: async (params: { auth_code: string; role: "user" | "admin" }) => {
      return await apiClient<UserWithTokenModel>({
        path: "/api/v1/user/microsoft_auth/signup/",
        method: "post",
        requestBody: params,
      });
    },
  },
};

export default AuthRepo;
