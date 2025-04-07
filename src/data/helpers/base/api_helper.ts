/* eslint-disable @typescript-eslint/no-explicit-any */

import { ApiHelperParams } from "./base_params";

export async function apiHelper(params: ApiHelperParams) {
  const {
    baseUrl,
    path,
    method,
    queryParams = {},
    requestBody = {},
    headers = {},
  } = params;
  const url = new URL(baseUrl + path);
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) =>
      url.searchParams.append(key, String(value))
    );
  }

  const options: RequestInit = {
    method: method.toUpperCase(),
    headers: headers,
    body: method != "get" ? JSON.stringify(requestBody ?? {}) : undefined,
  };

  const response = await fetch(url, options);

  return response;
}
