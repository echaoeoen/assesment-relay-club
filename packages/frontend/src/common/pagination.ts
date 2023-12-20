export interface Paginated<T> {
  totalItems: number;
  items: T[];
  totalPages: number;
  currentPage: number;
}

export interface PaginationParam {
  page: number;
  size: number;
}
