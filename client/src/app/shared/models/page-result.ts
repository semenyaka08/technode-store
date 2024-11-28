export interface PageResult<T> {
  items: T[];
  totalPages: number;
  totalItemsCount: number;
  pageNumber: number;
  pageSize: number;
}
