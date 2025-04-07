export interface ApiHelperParams {
  baseUrl: string;
  path: string;
  method: "get" | "post" | "patch" | "put" | "delete";
  queryParams?: Record<string, any>;
  requestBody?: Record<string, any>;
  headers?: Record<string, any>;
}
