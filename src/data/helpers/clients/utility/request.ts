import { API_URL } from "@/config";
import { handleResponse } from "./handle_response";
import { getAccessToken } from "../jwt_token_handler/get_tokens";
import { apiHelper } from "../../base/api_helper";
import { ApiClientParams, UploadApiClientParams } from "./params";
import { uploadApiHelper } from "../../base/upload_api_helper";

export async function request<T>(params: ApiClientParams): Promise<T> {
  const { headers = {} } = params;
  const baseUrl = API_URL;

  let _headers: Record<string, string> = {};
  _headers = {
    ...headers,
    "Content-Type": "application/json",
  };

  const accessToken = getAccessToken();
  if (accessToken) {
    _headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await apiHelper({
    baseUrl,
    ...params,
    headers: _headers,
  });

  return await handleResponse<T>(response);
}

export async function uploadRequest<T>(
  params: UploadApiClientParams
): Promise<T> {
  const { headers = {} } = params;
  const baseUrl = API_URL;

  let _headers: Record<string, string> = {};
  _headers = {
    ...headers,
  };

  const accessToken = getAccessToken();
  if (accessToken) {
    _headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await uploadApiHelper({
    baseUrl,
    ...params,
    headers: _headers,
  });

  return await handleResponse<T>(response);
}
