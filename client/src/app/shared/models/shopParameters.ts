export interface ShopParameters{
  categoryName? : string,
  filters?: Record<string, string[]>,
  selectedSort?: {sortBy: string, sortDirection: string},
  paginationParams?: {pageSize: number, pageNumber: number},
  searchPhrase?: string
}
