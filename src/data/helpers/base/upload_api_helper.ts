/* eslint-disable @typescript-eslint/no-explicit-any */

import { ApiHelperParams } from "./base_params";

export interface UploadApiHelperParams {
  baseUrl: string;
  path: string;
  method: "post" | "patch" | "put";
  requestBody?: Record<string, any>;
  headers?: Record<string, any>;
}

export async function uploadApiHelper(params: ApiHelperParams) {
  const { baseUrl, path, method, requestBody = {}, headers = {} } = params;
  const url = new URL(baseUrl + path);
  const formData = new FormData();
  for (const key in requestBody) {
    formData.append(key, requestBody[key]);
  }

  const options: RequestInit = {
    method: method.toUpperCase(),
    headers: headers,
    body: formData,
  };

  const response = await fetch(url, options);
  return response;
}
