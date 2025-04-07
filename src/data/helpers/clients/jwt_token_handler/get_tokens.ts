import { API_URL } from "@/config";
import { getStorageValue } from "../../base/local_storage_utility";
import { apiHelper } from "../../base/api_helper";
import { Mutex } from "async-mutex";

export function getAccessToken() {
  return getStorageValue("accessToken");
}

function getRefreshToken() {
  return getStorageValue("refreshToken");
}

const refreshTokenURLPath = "/api/v1/user/token/refresh/";

const refreshMutex = new Mutex();

export async function getNewAccessToken(): Promise<string | undefined> {
  return refreshMutex
    .runExclusive(async () => {
      const baseUrl = API_URL;
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        throw new Error("No refresh token provided");
      }

      const response = await apiHelper({
        baseUrl,
        path: refreshTokenURLPath,
        method: "post",
        requestBody: {
          refresh_token: refreshToken,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonResponse = await response.json();
      if (!("access_token" in jsonResponse)) {
        throw new Error("Failed to get access token");
      }

      return jsonResponse["access_token"];
    })
    .catch(() => undefined);
}
