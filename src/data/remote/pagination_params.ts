export interface BasePaginationParams {
  sort_order?: "asc" | "desc";
  page?: number;
  page_size?: number;
}

export interface BaseCursorPaginationParams {
  sort_order?: "asc" | "desc";
  cursor?: string;
  page_size?: number;
}
