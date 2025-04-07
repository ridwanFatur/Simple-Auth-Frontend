export interface ApiClientParams {
  path: string;
  method: "get" | "post" | "patch" | "put" | "delete";
  queryParams?: Record<string, any>;
  requestBody?: Record<string, any>;
  headers?: Record<string, any>;
}

export interface UploadApiClientParams {
  path: string;
  method: "post" | "patch" | "put";
  requestBody?: Record<string, any>;
  headers?: Record<string, any>;
}
