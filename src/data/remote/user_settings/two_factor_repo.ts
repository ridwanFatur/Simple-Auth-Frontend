import { apiClient } from "@/data/helpers/clients/api_client";
import {
  TwoFactorSettingModel,
  TwoFactorSetupModel,
} from "@/domain/models/two_factor_setting/two_factor_setting_model";
import { UserWithTokenModel } from "@/domain/models/user/user_model";

const TwoFactorRepo = {
  /** Settings */
  enable: async () => {
    return await apiClient({
      path: "/api/v1/settings/two_factor_setting/enable/",
      method: "post",
    });
  },

  disable: async (params: { otp_code: string; method: string }) => {
    return await apiClient({
      path: "/api/v1/settings/two_factor_setting/disable/",
      method: "post",
      requestBody: params,
    });
  },

  login: async (params: {
    otp_code: string;
    method: string;
    type: string;
    login_token: string;
  }) => {
    return await apiClient<UserWithTokenModel>({
      path: "/api/v1/settings/two_factor_setting/login/",
      method: "post",
      requestBody: params,
    });
  },

  /** Methods */
  getAvailableMethods: async () => {
    return await apiClient<TwoFactorSettingModel[]>({
      path: "/api/v1/settings/two_factor_method/",
      method: "get",
    });
  },

  addMethod: async (params: { method: string }) => {
    return await apiClient<TwoFactorSetupModel>({
      path: "/api/v1/settings/two_factor_method/add/",
      method: "post",
      requestBody: params,
    });
  },

  enableMethod: async (params: { otp_code: string; method: string }) => {
    return await apiClient({
      path: "/api/v1/settings/two_factor_method/enable/",
      method: "post",
      requestBody: params,
    });
  },

  disableMethod: async (params: { otp_code: string; method: string }) => {
    return await apiClient({
      path: "/api/v1/settings/two_factor_method/disable/",
      method: "post",
      requestBody: params,
    });
  },
};

export default TwoFactorRepo;
