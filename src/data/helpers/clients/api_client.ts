import { setStorageValue } from "../base/local_storage_utility";
import { getNewAccessToken } from "./jwt_token_handler/get_tokens";
import { AccessTokenExpiredException } from "./utility/exceptions";
import { ApiClientParams } from "./utility/params";
import { request } from "./utility/request";

export async function apiClient<T>(params: ApiClientParams): Promise<T> {
  try {
    const data = await request<T>(params);
    return data;
  } catch (error) {
    if (error instanceof AccessTokenExpiredException) {
      /** Refresh Token */
      const newAccessToken = await getNewAccessToken();
      if (newAccessToken == undefined) {
        throw new Error("Failed to get access token");
      }
      setStorageValue({
        accessToken: newAccessToken,
      });

      /** Call the API once again */
      const data = await request<T>(params);
      return data;
    } else {
      throw error;
    }
  }
}
