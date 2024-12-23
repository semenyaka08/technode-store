export interface OrdersParameters {
  selectedSort?: {sortBy: string, sortDirection: string},
  paginationParams?: {pageSize: number, pageNumber: number},
  searchParam?: string
  orderStatus?: string
}
